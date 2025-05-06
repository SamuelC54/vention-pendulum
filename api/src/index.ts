require("dotenv").config();

import buildServer from "./server";
import { ServerCredentials } from "@grpc/grpc-js";

const port = process.env.PORT ? parseInt(process.env.PORT) : 50051;

function main() {
  const server = buildServer();

  server.bindAsync(
    `0.0.0.0:${port}`,
    ServerCredentials.createInsecure(),
    (err, actualPort) => {
      if (err) {
        console.error("Failed to start gRPC server:", err);
        process.exit(1);
      }

      console.log(`🚀 gRPC server running at 0.0.0.0:${actualPort}`);
    }
  );
}

main();
