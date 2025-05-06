// Original file: protobuf/pendulum.proto

import type { PendulumState as _pendulum_PendulumState, PendulumState__Output as _pendulum_PendulumState__Output } from '../pendulum/PendulumState';

export interface MessageWithState {
  'message'?: (string);
  'state'?: (_pendulum_PendulumState | null);
}

export interface MessageWithState__Output {
  'message'?: (string);
  'state'?: (_pendulum_PendulumState__Output);
}
