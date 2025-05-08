'use server';

import createPendulumClient from '@/client';
import { fromGrpcPendulumState } from '@/helpers/converter';
import { pendulumIds, pendulumPortLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

export async function getPendulumsState() {
  const requests = pendulumIds.map(
    (id) =>
      new Promise<PendulumState>((resolve, reject) => {
        const client = createPendulumClient(pendulumPortLUT[id]);

        client.GetPendulumState({}, {}, (err, response) => {
          if (err) {
            console.log('🚀 ~ client.GetPendulumState ~ err:', err);
            reject(err);
            return;
          }
          if (!response) {
            reject(new Error(`No state returned from startPendulum for ${id}`));
            return;
          }
          resolve(fromGrpcPendulumState(response));
        });
      }),
  );

  return Promise.all(requests);
}
