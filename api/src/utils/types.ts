// Need to be in sync with the client side types

export interface Position {
  x: number;
  y: number;
}

export interface PendulumState {
  id: string; // Pendulum ID
  anchorPosition: Position; // Anchor position
  angle: number; // Angle in radians
  length: number; // Length of the pendulum
  radius: number; // Mass radius
  mass: number; // Mass in kg
  velocity: number;
  color: string; // Color of the pendulum
  state: "running" | "stopped";
}
