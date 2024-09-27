import buildServer from "./server";

const server = buildServer();

const port = process.env.PORT || 3001;

async function main() {
  try {
    await server.listen(port, "0.0.0.0");

    console.log(`Server ready at http://localhost:${port}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
