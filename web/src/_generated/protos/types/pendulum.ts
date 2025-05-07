import type * as grpc from '@grpc/grpc-js';
import type {
  EnumTypeDefinition,
  MessageTypeDefinition,
} from '@grpc/proto-loader';

import type {
  PendulumServiceClient as _pendulum_PendulumServiceClient,
  PendulumServiceDefinition as _pendulum_PendulumServiceDefinition,
} from './pendulum/PendulumService';

type SubtypeConstructor<
  Constructor extends new (...args: any) => any,
  Subtype,
> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  pendulum: {
    Empty: MessageTypeDefinition;
    HealthStatus: MessageTypeDefinition;
    MessageWithState: MessageTypeDefinition;
    PendulumService: SubtypeConstructor<
      typeof grpc.Client,
      _pendulum_PendulumServiceClient
    > & { service: _pendulum_PendulumServiceDefinition };
    PendulumState: MessageTypeDefinition;
    Position: MessageTypeDefinition;
    SetInitialStateRequest: MessageTypeDefinition;
    SimulationState: EnumTypeDefinition;
  };
}
