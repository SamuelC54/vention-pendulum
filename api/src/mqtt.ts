import mqtt from "mqtt";
import pendulum from "./pendulum";

const mqttBrokerHost = process.env.MQTT_BROKER || "mqtt-broker";
const mqttBrokerPort = process.env.MQTT_PORT || "1883";

const mqttBrokerUrl = `${mqttBrokerHost}:${mqttBrokerPort}`;

export const mqtt_Client = mqtt.connect(`mqtt://${mqttBrokerUrl}`);

mqtt_Client.on("connect", () => {
  console.log(`Connected to  MQTT broker at ${mqttBrokerUrl}`);

  // Subscribe to the collision alert channel
  mqtt_Client.subscribe("collision/alert", (err) => {
    if (!err) {
      console.log("Subscribed to topic: collision/alert");
    }
  });
});

mqtt_Client.on("message", (topic, message) => {
  if (topic === "collision/alert") {
    const payload = message.toString();
    if (payload === "stop") {
      // Stop the pendulum if a collision is detected
      console.log("Collision detected! Stopping pendulum.");
      pendulum.stop();
      // After 5 seconds, send a signal to restart
      setTimeout(() => {
        console.log("Sending restart signal after 5 seconds...");
        mqtt_Client.publish("collision/alert", "restart", (err) => {
          if (err) {
            console.error("Error sending restart signal:", err);
          }
        });
      }, 5000); // 5000 ms = 5 seconds
    }

    if (payload === "restart") {
      // Restart the pendulum if a restart signal is received
      console.log("Restart signal received. Restarting pendulum.");
      pendulum.restart();
    }
  }
});
