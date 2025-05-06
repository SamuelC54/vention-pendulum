import { Server, ServerCredentials } from "@grpc/grpc-js";
import {
  PendulumServiceService,
  IPendulumServiceServer,
} from "./proto/pendulum_grpc_pb";
import {
  PendulumState as ProtoPendulumState,
  SetInitialStateRequest,
  Empty,
  MessageWithState,
  Position,
} from "./proto/pendulum_pb";

import pendulum from "./pendulum";
import { PendulumState } from "./utils/types";

function buildServer(): Server {
  const handlers: IPendulumServiceServer = {
    HealthCheck: (_, callback) => {
      const res = new MessageWithState();
      res.setMessage("OK");
      callback(null, res);
    },

    GetPendulumState: (_, callback) => {
      const state = pendulum.getPendulumState();
      callback(null, toProtoState(state));
    },

    StartPendulum: (_, callback) => {
      pendulum.setState("running");
      const res = new MessageWithState();
      res.setMessage("Pendulum started");
      res.setState(toProtoState(pendulum.getPendulumState()));
      callback(null, res);
    },

    StopPendulum: (_, callback) => {
      pendulum.setState("stopped");
      const res = new MessageWithState();
      res.setMessage("Pendulum stopped");
      res.setState(toProtoState(pendulum.getPendulumState()));
      callback(null, res);
    },

    SetInitialState: (call, callback) => {
      const protoState = call.request.getState();
      if (!protoState) return callback(new Error("Missing state"));

      const jsState = fromProtoState(protoState);
      pendulum.setInitialState(jsState);

      const res = new MessageWithState();
      res.setMessage("Initial state set");
      res.setState(toProtoState(pendulum.getPendulumState()));
      callback(null, res);
    },
  };

  const server = new Server();
  server.addService(PendulumServiceService, handlers);
  return server;
}

function toProtoState(state: PendulumState): ProtoPendulumState {
  const proto = new ProtoPendulumState();
  proto.setId(state.id);
  const pos = new Position();
  pos.setX(state.anchorPosition.x);
  pos.setY(state.anchorPosition.y);
  proto.setAnchorPosition(pos);
  proto.setAngle(state.angle);
  proto.setLength(state.length);
  proto.setRadius(state.radius);
  proto.setVelocity(state.velocity);
  proto.setColor(state.color);
  proto.setState(state.state === "running" ? 0 : 1);
  proto.setHasCollision(state.hasCollision);
  proto.setNeighborsurlList(state.neighborsURL);
  return proto;
}

function fromProtoState(proto: ProtoPendulumState): PendulumState {
  return {
    id: proto.getId(),
    anchorPosition: {
      x: proto.getAnchorPosition()?.getX() ?? 0,
      y: proto.getAnchorPosition()?.getY() ?? 0,
    },
    angle: proto.getAngle(),
    length: proto.getLength(),
    radius: proto.getRadius(),
    velocity: proto.getVelocity(),
    color: proto.getColor(),
    state: proto.getState() === 0 ? "running" : "stopped",
    hasCollision: proto.getHasCollision(),
    neighborsURL: proto.getNeighborsurlList(),
  };
}

export default buildServer;
