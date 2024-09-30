import { mqtt_Client } from "./mqtt";
import { PendulumState, Position } from "./utils/types";
import fetch from "node-fetch";

const GRAVITY = 9.81; // in m/s^2
const TIME_STEP = 0.01; // in seconds
const COLLISION_THRESHOLD = 1.1; // in meters
const COLLISION_CHECK_INTERVAL = 0.1; // in seconds

class Pendulum {
  private state: PendulumState;
  private initialState: PendulumState;
  private simulationInterval: NodeJS.Timeout | null;
  private collisionCheckInterval: NodeJS.Timeout | null;

  constructor() {
    this.state = {
      id: "0",
      anchorPosition: { x: 0, y: 0 },
      angle: 0,
      length: 1,
      radius: 0.1,
      velocity: 0,
      state: "stopped",
      color: "#FF0000",
      hasCollision: false,
      neighborsURL: [],
    };
    this.initialState = { ...this.state };
    this.simulationInterval = null;
    this.collisionCheckInterval = null;
  }

  private simulateStep(): void {
    if (this.state.state === "running") {
      const { angle, length } = this.state;
      const acceleration = -(GRAVITY / length) * Math.sin(angle);
      this.state.velocity += acceleration * TIME_STEP;
      this.state.angle += this.state.velocity * TIME_STEP;
    }
  }

  public getMassPosition(): Position {
    const { anchorPosition, angle, length } = this.state;
    return {
      x: anchorPosition.x + length * Math.sin(angle),
      y: anchorPosition.y + length * Math.cos(angle),
    };
  }

  private calculateMassPosition(pendulumState: PendulumState): Position {
    const { anchorPosition, angle, length } = pendulumState;
    return {
      x: anchorPosition.x + length * Math.sin(angle),
      y: anchorPosition.y + length * Math.cos(angle),
    };
  }

  private async checkForCollisions(): Promise<void> {
    const neighborURLs = this.state.neighborsURL;
    let collisionDetected = false;

    for (const url of neighborURLs) {
      try {
        const response = await fetch(`${url}/pendulum/state`);
        if (!response.ok) {
          console.error(`Error fetching state from neighbor at ${url}`);
          continue;
        }
        const neighborState = (await response.json()) as PendulumState;
        const collision = this.detectCollision(neighborState);
        if (collision) {
          collisionDetected = true;
          mqtt_Client.publish("collision/alert", "stop", (err) => {
            if (err) {
              console.error("Error publishing collision alert:", err);
            }
          });
        }
      } catch (error) {
        console.error(`Error connecting to neighbor at ${url}:`, error);
      }
    }

    this.state.hasCollision = collisionDetected;
  }

  public detectCollision(neighborState: PendulumState): boolean {
    const myPosition = this.getMassPosition();
    const neighborPosition = this.calculateMassPosition(neighborState);
    const distance = Math.sqrt(
      (myPosition.x - neighborPosition.x) ** 2 +
        (myPosition.y - neighborPosition.y) ** 2
    );
    const combinedRadius = this.state.radius + neighborState.radius;
    return distance <= combinedRadius + COLLISION_THRESHOLD;
  }

  public scheduleCollisionCheck(): void {
    this.collisionCheckInterval = setTimeout(async () => {
      await this.checkForCollisions();
      this.scheduleCollisionCheck();
    }, COLLISION_CHECK_INTERVAL * 1000);
  }

  public start(): void {
    if (!this.simulationInterval) {
      this.simulationInterval = setInterval(
        () => this.simulateStep(),
        TIME_STEP * 1000
      );
    }
    if (!this.collisionCheckInterval) {
      this.scheduleCollisionCheck();
    }
  }

  public stop(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
    if (this.collisionCheckInterval) {
      clearTimeout(this.collisionCheckInterval);
      this.collisionCheckInterval = null;
    }
  }

  public setState(state: "running" | "stopped"): void {
    if (state === "running") {
      this.state.state = "running";
      this.start();
    } else if (state === "stopped") {
      this.state.state = "stopped";
      this.stop();
    }
  }

  public setInitialState(pendulumState: PendulumState): void {
    this.state = {
      ...pendulumState,
    };
    this.initialState = { ...pendulumState };
    this.start(); // Ensure the simulation is started
  }

  public restart(): void {
    this.state = { ...this.initialState };
    this.start();
  }

  public getPendulumState(): PendulumState {
    return this.state;
  }
}

export default new Pendulum();
