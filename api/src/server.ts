import Fastify, { FastifyRequest } from "fastify";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import fastifyCors from "fastify-cors";
import { version } from "../package.json";
import Pendulum, { PendulumState } from "./pendulum";

function buildServer() {
  const server = Fastify();

  server.register(fastifyCors, {
    origin: "http://localhost:3000", // Allow this specific origin
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
      anchorPosition: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
        required: ["x", "y"],
      },
      massPosition: {
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
      mass: { type: "number" },
      velocity: { type: "number" },
      state: { type: "string", enum: ["running", "stopped"] },
    },
    required: [
      "anchorPosition",
      "massPosition",
      "angle",
      "length",
      "radius",
      "mass",
      "velocity",
      "state",
    ],
  };

  const SetInitialPositionSchema = {
    type: "object",
    properties: {
      anchorPosition: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
      },
      massPosition: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
      },
      angle: { type: "number" },
      length: { type: "number" },
      radius: { type: "number" },
      mass: { type: "number" },
      velocity: { type: "number" },
    },
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
      return Pendulum.getPendulumState();
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
      Pendulum.setState("running");
      return {
        message: "Pendulum started",
        state: Pendulum.getPendulumState(),
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
      Pendulum.setState("stopped");
      return {
        message: "Pendulum stopped",
        state: Pendulum.getPendulumState(),
      };
    }
  );

  // Endpoint to Set Initial Position
  server.post(
    "/pendulum/set-initial-position",
    {
      schema: {
        description: "Set the initial position and state of the pendulum",
        tags: ["Pendulum"],
        body: SetInitialPositionSchema,
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
        Body: Partial<PendulumState>;
      }>
    ) {
      const initialState: Partial<PendulumState> = request.body;
      Pendulum.setInitialPosition(initialState);
      return {
        message: "Pendulum initial position set",
        state: Pendulum.getPendulumState(),
      };
    }
  );

  return server;
}

export default buildServer;
