// Need to be in sync with the client side types

import { SimulationState } from '@/_generated/protos/types/pendulum/SimulationState';

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
  velocity: number;
  color: string; // Color of the pendulum
  simulationState: SimulationState;
  hasCollision: boolean;
  neighborsURL: string[];
}
