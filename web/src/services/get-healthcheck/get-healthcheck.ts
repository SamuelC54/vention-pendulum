'use server';

import { HealthStatus } from '@/_generated/protos/types/pendulum/HealthStatus';
import createPendulumClient from '@/client';
import { pendulumPortLUT } from '@/utils/pendulum-server-lut';

export async function getHealthcheck(
  pendulumId: string,
): Promise<HealthStatus> {
  const client = createPendulumClient(pendulumPortLUT[pendulumId]);

  return new Promise((resolve, reject) => {
    client.healthCheck({}, {}, (err, response) => {
      if (err) {
        reject(err);
        return;
      }
      if (!response) {
        reject(new Error('No response from health check'));
        return;
      }
      resolve(response);
    });
  });
}
