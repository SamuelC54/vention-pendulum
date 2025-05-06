// Original file: ../protobuf/pendulum.proto

export const SimulationState = {
  RUNNING: 0,
  STOPPED: 1,
} as const;

export type SimulationState =
  | 'RUNNING'
  | 0
  | 'STOPPED'
  | 1

export type SimulationState__Output = typeof SimulationState[keyof typeof SimulationState]
