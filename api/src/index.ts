import buildServer from "./server";

const server = buildServer();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

async function main() {
  try {
    await server.listen(port, "0.0.0.0");

    console.log(`Server ready at http://localhost:${port}`);
    console.log(`Swagger ready at http://localhost:${port}/docs`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
