import { PendulumState, Position } from "./utils/types";

const GRAVITY = 9.81; // in m/s^2
const TIME_STEP: number = 0.01; // in seconds

class Pendulum {
  private state: PendulumState;
  private simulationInterval: NodeJS.Timeout | null;

  constructor() {
    this.state = {
      id: "0",
      anchorPosition: { x: 0, y: 0 },
      angle: 0,
      length: 1,
      radius: 0.1,
      mass: 1,
      velocity: 0,
      state: "stopped",
      color: "#FF0000",
    };
    this.simulationInterval = null;
  }

  private simulateStep(): void {
    if (this.state.state === "running") {
      const { angle, length } = this.state;
      const acceleration = -(GRAVITY / length) * Math.sin(angle);
      this.state.velocity += acceleration * TIME_STEP;
      this.state.angle += this.state.velocity * TIME_STEP;
    }
  }

  private getMassPosition(): Position {
    const { anchorPosition, angle, length } = this.state;
    return {
      x: anchorPosition.x + length * Math.sin(angle),
      y: anchorPosition.y + length * Math.cos(angle),
    };
  }

  public start(): void {
    if (!this.simulationInterval) {
      this.simulationInterval = setInterval(
        () => this.simulateStep(),
        TIME_STEP * 1000
      );
    }
  }

  public stop(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
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
    this.start(); // Ensure the simulation is started
  }

  public getPendulumState(): PendulumState {
    return this.state;
  }
}

export default new Pendulum();
