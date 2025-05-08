'use server';

import { MessageWithState } from '@/_generated/protos/types/pendulum/MessageWithState';
import createPendulumClient from '@/client';
import { pendulumIds, pendulumPortLUT } from '@/utils/pendulum-server-lut';

export async function stopPendulumsSimulation() {
  const requests = pendulumIds.map(
    (id) =>
      new Promise<MessageWithState>((resolve, reject) => {
        const client = createPendulumClient(pendulumPortLUT[id]);

        client.StopPendulum({}, {}, (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          if (!response?.state) {
            reject(new Error(`No state returned from startPendulum for ${id}`));
            return;
          }
          resolve(response);
        });
      }),
  );

  return Promise.all(requests);
}
