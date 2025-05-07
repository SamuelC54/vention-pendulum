import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType } from './_generated/protos/types/pendulum';

const PROTO_FILE = './src/_generated/pendulum.proto';
const packageDef = protoLoader.loadSync(PROTO_FILE, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: ['./_generated/'],
});
const grpcObj = grpc.loadPackageDefinition(
  packageDef,
) as unknown as ProtoGrpcType;

export default function createPendulumClient(port?: string) {
  if (!port) {
    throw new Error('Pendulum port is not defined');
  }

  return new grpcObj.pendulum.PendulumService(
    `0.0.0.0:${port}`,
    grpc.credentials.createInsecure(),
  );
}
