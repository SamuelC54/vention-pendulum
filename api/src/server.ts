import Fastify, { fastify } from "fastify";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";

import fastifyCors from "fastify-cors";

import { version } from "../package.json";

function buildServer() {
  const server = Fastify();

  server.register(fastifyCors, {
    origin: "http://localhost:3000", // Allow this specific origin
    methods: ["GET", "POST"], // Specify allowed HTTP methods
  });

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version,
        },
      },
    })
  );

  return server;
}

export default buildServer;
