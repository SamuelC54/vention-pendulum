const GRAVITY = 9.81; // in m/s^2
const TIME_STEP: number = 0.01; // in seconds

interface Position {
  x: number;
  y: number;
}

export interface PendulumState {
  anchorPosition: Position; // Anchor position
  massPosition: Position; // Mass position
  angle: number; // Angle in radians
  length: number; // Length of the pendulum
  radius: number; // Mass radius
  mass: number; // Mass in kg
  velocity: number;
  state: "running" | "stopped";
}

class Pendulum {
  private state: PendulumState;
  private simulationInterval: NodeJS.Timeout | null;

  constructor() {
    this.state = {
      anchorPosition: { x: 0, y: 0 },
      massPosition: { x: 0, y: 0 },
      angle: 0,
      length: 1,
      radius: 0.1,
      mass: 1,
      velocity: 0,
      state: "stopped",
    };
    this.simulationInterval = null;
    this.updateMassPosition();
  }

  private updateMassPosition(): void {
    const { anchorPosition, angle, length } = this.state;
    this.state.massPosition = {
      x: anchorPosition.x + length * Math.sin(angle),
      y: anchorPosition.y + length * Math.cos(angle),
    };
  }

  private simulateStep(): void {
    if (this.state.state === "running") {
      const { angle, length } = this.state;
      const acceleration = -(GRAVITY / length) * Math.sin(angle);
      this.state.velocity += acceleration * TIME_STEP;
      this.state.angle += this.state.velocity * TIME_STEP;
      this.updateMassPosition();
    }
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

  public setInitialPosition(pendulumState: Partial<PendulumState>): void {
    this.state = {
      ...this.state,
      ...pendulumState,
      state: "stopped",
    };
    this.updateMassPosition();
    this.stop(); // Ensure the simulation is stopped
  }

  public getPendulumState(): PendulumState {
    return this.state;
  }
}

export default new Pendulum();
