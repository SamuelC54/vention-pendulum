// Original file: src/protobuf/pendulum.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _pendulum_Empty, Empty__Output as _pendulum_Empty__Output } from '../pendulum/Empty';
import type { HealthStatus as _pendulum_HealthStatus, HealthStatus__Output as _pendulum_HealthStatus__Output } from '../pendulum/HealthStatus';
import type { MessageWithState as _pendulum_MessageWithState, MessageWithState__Output as _pendulum_MessageWithState__Output } from '../pendulum/MessageWithState';
import type { PendulumState as _pendulum_PendulumState, PendulumState__Output as _pendulum_PendulumState__Output } from '../pendulum/PendulumState';
import type { SetInitialStateRequest as _pendulum_SetInitialStateRequest, SetInitialStateRequest__Output as _pendulum_SetInitialStateRequest__Output } from '../pendulum/SetInitialStateRequest';

export interface PendulumServiceClient extends grpc.Client {
  GetPendulumState(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  GetPendulumState(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  GetPendulumState(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  GetPendulumState(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  getPendulumState(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  getPendulumState(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  getPendulumState(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  getPendulumState(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_PendulumState__Output>): grpc.ClientUnaryCall;
  
  HealthCheck(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  HealthCheck(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  HealthCheck(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  HealthCheck(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  healthCheck(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  healthCheck(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  healthCheck(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  healthCheck(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_HealthStatus__Output>): grpc.ClientUnaryCall;
  
  SetInitialState(argument: _pendulum_SetInitialStateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  SetInitialState(argument: _pendulum_SetInitialStateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  SetInitialState(argument: _pendulum_SetInitialStateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  SetInitialState(argument: _pendulum_SetInitialStateRequest, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  setInitialState(argument: _pendulum_SetInitialStateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  setInitialState(argument: _pendulum_SetInitialStateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  setInitialState(argument: _pendulum_SetInitialStateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  setInitialState(argument: _pendulum_SetInitialStateRequest, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  
  StartPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  StartPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  StartPendulum(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  StartPendulum(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  startPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  startPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  startPendulum(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  startPendulum(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  
  StopPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  StopPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  StopPendulum(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  StopPendulum(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  stopPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  stopPendulum(argument: _pendulum_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  stopPendulum(argument: _pendulum_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  stopPendulum(argument: _pendulum_Empty, callback: grpc.requestCallback<_pendulum_MessageWithState__Output>): grpc.ClientUnaryCall;
  
  StreamPendulumState(argument: _pendulum_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_pendulum_PendulumState__Output>;
  StreamPendulumState(argument: _pendulum_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_pendulum_PendulumState__Output>;
  streamPendulumState(argument: _pendulum_Empty, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_pendulum_PendulumState__Output>;
  streamPendulumState(argument: _pendulum_Empty, options?: grpc.CallOptions): grpc.ClientReadableStream<_pendulum_PendulumState__Output>;
  
}

export interface PendulumServiceHandlers extends grpc.UntypedServiceImplementation {
  GetPendulumState: grpc.handleUnaryCall<_pendulum_Empty__Output, _pendulum_PendulumState>;
  
  HealthCheck: grpc.handleUnaryCall<_pendulum_Empty__Output, _pendulum_HealthStatus>;
  
  SetInitialState: grpc.handleUnaryCall<_pendulum_SetInitialStateRequest__Output, _pendulum_MessageWithState>;
  
  StartPendulum: grpc.handleUnaryCall<_pendulum_Empty__Output, _pendulum_MessageWithState>;
  
  StopPendulum: grpc.handleUnaryCall<_pendulum_Empty__Output, _pendulum_MessageWithState>;
  
  StreamPendulumState: grpc.handleServerStreamingCall<_pendulum_Empty__Output, _pendulum_PendulumState>;
  
}

export interface PendulumServiceDefinition extends grpc.ServiceDefinition {
  GetPendulumState: MethodDefinition<_pendulum_Empty, _pendulum_PendulumState, _pendulum_Empty__Output, _pendulum_PendulumState__Output>
  HealthCheck: MethodDefinition<_pendulum_Empty, _pendulum_HealthStatus, _pendulum_Empty__Output, _pendulum_HealthStatus__Output>
  SetInitialState: MethodDefinition<_pendulum_SetInitialStateRequest, _pendulum_MessageWithState, _pendulum_SetInitialStateRequest__Output, _pendulum_MessageWithState__Output>
  StartPendulum: MethodDefinition<_pendulum_Empty, _pendulum_MessageWithState, _pendulum_Empty__Output, _pendulum_MessageWithState__Output>
  StopPendulum: MethodDefinition<_pendulum_Empty, _pendulum_MessageWithState, _pendulum_Empty__Output, _pendulum_MessageWithState__Output>
  StreamPendulumState: MethodDefinition<_pendulum_Empty, _pendulum_PendulumState, _pendulum_Empty__Output, _pendulum_PendulumState__Output>
}
