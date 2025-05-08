'use server';

import { PendulumState } from '@/_generated/protos/types/pendulum/PendulumState';
import createPendulumClient from '@/client';
import { pendulumIds, pendulumPortLUT } from '@/utils/pendulum-server-lut';

export async function getPendulumsState() {
  const requests = pendulumIds.map(
    (id) =>
      new Promise<PendulumState>((resolve, reject) => {
        const client = createPendulumClient(pendulumPortLUT[id]);

        client.GetPendulumState({}, {}, (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          if (!response) {
            reject(new Error(`No state returned from startPendulum for ${id}`));
            return;
          }
          resolve(response);
        });
      }),
  );

  return Promise.all(requests);
}
