import { SimulationState } from "../_generated/proto/pendulum/SimulationState";
import { PendulumState__Output as GrpcPendulumState } from "../_generated/proto/pendulum/PendulumState";
import { PendulumState } from "./types";

export function fromGrpcPendulumState(
  grpcState?: GrpcPendulumState
): PendulumState {
  if (!grpcState) {
    throw new Error("Missing PendulumState");
  }

  if (!grpcState.anchorPosition) {
    throw new Error("Missing anchorPosition in PendulumState");
  }

  return {
    id: grpcState.id ?? "",
    anchorPosition: {
      x: Number(grpcState.anchorPosition.x ?? 0),
      y: Number(grpcState.anchorPosition.y ?? 0),
    },
    angle: Number(grpcState.angle ?? 0),
    length: Number(grpcState.length ?? 0),
    radius: Number(grpcState.radius ?? 0),
    velocity: Number(grpcState.velocity ?? 0),
    color: grpcState.color ?? "#000000",
    simulationState: grpcState.simulationState ?? SimulationState.STOPPED,
    hasCollision: grpcState.hasCollision ?? false,
    neighborsURL: grpcState.neighborsURL ?? [],
  };
}
