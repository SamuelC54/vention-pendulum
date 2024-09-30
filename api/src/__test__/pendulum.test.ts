import { test } from "tap";
import pendulum from "../pendulum";
import { mqtt_Client } from "../mqtt";

test("Pendulum Class", (t) => {
  t.teardown(() => {
    mqtt_Client.end();
  });

  t.beforeEach(() => {
    pendulum.restart();
  });

  t.afterEach(() => {
    pendulum.stop(); // Ensure intervals are cleared after each test
  });

  t.test("should initialize with correct default state", (t) => {
    const defaultState = {
      id: "0",
      anchorPosition: { x: 0, y: 0 },
      angle: 0,
      length: 1,
      radius: 0.1,
      velocity: 0,
      state: "stopped",
      color: "#FF0000",
      hasCollision: false,
      neighborsURL: [],
    };

    t.same(
      pendulum.getPendulumState(),
      defaultState,
      "Pendulum default state should match"
    );
    t.end();
  });

  t.test(
    "should update state and start simulation when set to running",
    (t) => {
      pendulum.setState("running");
      t.equal(
        pendulum.getPendulumState().state,
        "running",
        "Pendulum state should be running"
      );
      t.end();
    }
  );

  t.test("should stop simulation when set to stopped", (t) => {
    pendulum.setState("running");
    pendulum.setState("stopped");
    t.equal(
      pendulum.getPendulumState().state,
      "stopped",
      "Pendulum state should be stopped"
    );
    t.end();
  });

  t.test(
    "should update the state correctly when setInitialState is called",
    (t) => {
      const newState = {
        id: "1",
        anchorPosition: { x: 2, y: 3 },
        angle: Math.PI / 4,
        length: 2,
        radius: 0.2,
        velocity: 0.5,
        state: "running" as const,
        color: "#00FF00",
        hasCollision: false,
        neighborsURL: [],
      };

      pendulum.setInitialState(newState);
      t.same(
        pendulum.getPendulumState(),
        newState,
        "Pendulum state should be updated to new state"
      );
      t.end();
    }
  );

  t.test("should calculate mass position correctly", (t) => {
    const initialState = {
      ...pendulum.getPendulumState(),
      anchorPosition: { x: 1, y: 1 },
      angle: Math.PI / 4,
      length: 2,
    };
    pendulum.setInitialState(initialState);

    const expectedPosition = {
      x: 1 + Math.sin(Math.PI / 4) * 2,
      y: 1 + Math.cos(Math.PI / 4) * 2,
    };

    t.same(
      pendulum.getMassPosition(),
      expectedPosition,
      "Pendulum mass position should be calculated correctly"
    );
    t.end();
  });

  // New test to detect collision
  t.test("should detect collision correctly", (t) => {
    const pendulumState1 = {
      id: "1",
      anchorPosition: { x: 0, y: 0 },
      angle: Math.PI / 4,
      length: 2,
      radius: 0.2,
      velocity: 0,
      state: "running" as const,
      color: "#00FF00",
      hasCollision: false,
      neighborsURL: [],
    };

    const pendulumState2 = {
      id: "2",
      anchorPosition: { x: 0.5, y: 0.5 },
      angle: Math.PI / 6,
      length: 1.5,
      radius: 0.2,
      velocity: 0,
      state: "running" as const,
      color: "#0000FF",
      hasCollision: false,
      neighborsURL: [],
    };

    pendulum.setInitialState(pendulumState1);

    // Case where pendulums collide
    const collisionDetected = pendulum.detectCollision(pendulumState2);
    t.ok(collisionDetected, "Collision should be detected between pendulums");

    // Case where pendulums do not collide
    const distantPendulumState = {
      ...pendulumState2,
      anchorPosition: { x: 10, y: 10 }, // Move far away
    };

    const noCollisionDetected = pendulum.detectCollision(distantPendulumState);
    t.notOk(
      noCollisionDetected,
      "No collision should be detected with distant pendulum"
    );

    t.end();
  });

  t.end();
});
