import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./_generated/proto/pendulum";
import { PendulumServiceHandlers } from "./_generated/proto/pendulum/PendulumService";
import pendulum from "./pendulum";
import { fromGrpcPendulumState } from "./utils/converter";

const PROTO_FILE = "../../protobuf/pendulum.proto";
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const PendulumClient = grpcObj.pendulum;

export function getServer() {
  const server = new grpc.Server();
  server.addService(PendulumClient.PendulumService.service, {
    HealthCheck: (req, res) => {
      res(null, { status: "OK" });
    },
    GetPendulumState: (req, res) => {
      res(null, {
        ...pendulum.getPendulumState(),
      });
    },
    StartPendulum: (req, res) => {
      pendulum.start();
      res(null, {
        message: "Pendulum started",
        state: pendulum.getPendulumState(),
      });
    },
    StopPendulum: (req, res) => {
      pendulum.stop();
      res(null, {
        message: "Pendulum stopped",
        state: pendulum.getPendulumState(),
      });
    },
    SetInitialState: (req, res) => {
      pendulum.setInitialState(fromGrpcPendulumState(req?.request?.state));
      res(null, {
        message: "Pendulum initial state set",
        state: pendulum.getPendulumState(),
      });
    },
  } as PendulumServiceHandlers);
  return server;
}
