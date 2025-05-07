// Original file: src/_generated/pendulum.proto

export const SimulationState = {
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
} as const;

export type SimulationState =
  | 'RUNNING'
  | 0
  | 'STOPPED'
  | 1

export type SimulationState__Output = typeof SimulationState[keyof typeof SimulationState]
