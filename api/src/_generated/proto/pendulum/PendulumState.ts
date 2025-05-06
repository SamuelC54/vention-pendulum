// Original file: ../protobuf/pendulum.proto

import type {
  Position as _pendulum_Position,
  Position__Output as _pendulum_Position__Output,
} from "../pendulum/Position";
import type {
  SimulationState as _pendulum_SimulationState,
  SimulationState__Output as _pendulum_SimulationState__Output,
} from "../pendulum/SimulationState";

export interface PendulumState {
  id?: string;
  anchorPosition?: _pendulum_Position | null;
  angle?: number | string;
  length?: number | string;
  radius?: number | string;
  velocity?: number | string;
  color?: string;
  simulationState?: _pendulum_SimulationState;
  hasCollision?: boolean;
  neighborsURL?: string[];
}

export interface PendulumState__Output {
  id?: string;
  anchorPosition?: _pendulum_Position__Output;
  angle?: number | string;
  length?: number | string;
  radius?: number | string;
  velocity?: number | string;
  color?: string;
  simulationState?: _pendulum_SimulationState__Output;
  hasCollision?: boolean;
  neighborsURL?: string[];
}
