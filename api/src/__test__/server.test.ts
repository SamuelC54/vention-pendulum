import { test } from "tap";
import buildServer from "../server";
import { mqtt_Client } from "../mqtt";

test("requests the `/healthcheck` route", async (t) => {
  const fastify = buildServer();

  t.teardown(() => {
    mqtt_Client.end();
    fastify.close();
  });

  const response = await fastify.inject({
    method: "GET",
    url: "/healthcheck",
  });

  t.equal(response.statusCode, 200);
  t.same(response.json(), { status: "OK" });
});
