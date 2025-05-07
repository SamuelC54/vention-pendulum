'use server';

import createPendulumClient from '@/client';
import { pendulumPortLUT } from '@/utils/pendulum-server-lut';

export async function getHealthcheck(pendulumId: string) {
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
      resolve(response.status);
    });
  });
}
