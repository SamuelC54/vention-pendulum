import Fastify, { FastifyRequest } from "fastify";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import fastifyCors from "fastify-cors";
import { version } from "../package.json";
import pendulum from "./pendulum";
import { PendulumState } from "./utils/types";

function buildServer() {
  const server = Fastify();

  server.register(fastifyCors, {
    origin: true, // Allow all origins
    methods: ["GET", "POST"], // Specify allowed HTTP methods
  });

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Pendulum API",
          description: "API for managing a pendulum simulation",
          version,
        },
      },
    })
  );

  // Health Check Endpoint
  server.get(
    "/healthcheck",
    {
      schema: {
        description: "Health check endpoint",
        tags: ["Health"],
        response: {
          200: {
            type: "object",
            properties: {
              status: { type: "string" },
            },
          },
        },
      },
    },
    async function () {
      return { status: "OK" };
    }
  );

  const PendulumStateSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      anchorPosition: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
        required: ["x", "y"],
      },
      angle: { type: "number" },
      length: { type: "number" },
      radius: { type: "number" },
      velocity: { type: "number" },
      color: { type: "string" },
      state: { type: "string", enum: ["running", "stopped"] },
      hasCollision: { type: "boolean" },
      neighborsURL: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: [
      "id",
      "anchorPosition",
      "angle",
      "length",
      "radius",
      "velocity",
      "color",
      "state",
      "hasCollision",
      "neighborsURL",
    ],
  };

  const SetInitialStateSchema = {
    type: "object",
    properties: {
      id: { type: "string" },
      anchorPosition: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
        required: ["x", "y"],
      },
      angle: { type: "number" },
      length: { type: "number" },
      radius: { type: "number" },
      velocity: { type: "number" },
      color: { type: "string" },
      hasCollision: { type: "boolean" },
      neighborsURL: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: [
      "id",
      "anchorPosition",
      "angle",
      "length",
      "radius",
      "velocity",
      "color",
      "hasCollision",
      "neighborsURL",
    ],
  };

  // Endpoint to Get Pendulum State
  server.get(
    "/pendulum/state",
    {
      schema: {
        description: "Get the current state of the pendulum",
        tags: ["Pendulum"],
        response: {
          200: PendulumStateSchema,
        },
      },
    },
    async function () {
      return pendulum.getPendulumState();
    }
  );

  // Endpoint to Start the Pendulum
  server.post(
    "/pendulum/start",
    {
      schema: {
        description: "Start the pendulum simulation",
        tags: ["Pendulum"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              state: PendulumStateSchema,
            },
          },
        },
      },
    },
    async function () {
      pendulum.setState("running");
      return {
        message: "Pendulum started",
        state: pendulum.getPendulumState(),
      };
    }
  );

  // Endpoint to Stop the Pendulum
  server.post(
    "/pendulum/stop",
    {
      schema: {
        description: "Stop the pendulum simulation",
        tags: ["Pendulum"],
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              state: PendulumStateSchema,
            },
          },
        },
      },
    },
    async function () {
      pendulum.setState("stopped");
      return {
        message: "Pendulum stopped",
        state: pendulum.getPendulumState(),
      };
    }
  );

  // Endpoint to Set Initial State
  server.post(
    "/pendulum/set-initial-state",
    {
      schema: {
        description: "Set the initial state of the pendulum",
        tags: ["Pendulum"],
        body: SetInitialStateSchema,
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
              state: PendulumStateSchema,
            },
          },
        },
      },
    },
    async function (
      request: FastifyRequest<{
        Body: PendulumState;
      }>
    ) {
      const initialState: PendulumState = request.body;
      pendulum.setInitialState(initialState);
      return {
        message: "Pendulum initial state set",
        state: pendulum.getPendulumState(),
      };
    }
  );

  return server;
}

export default buildServer;
