'use server';

import { MessageWithState } from '@/_generated/protos/types/pendulum/MessageWithState';
import createPendulumClient from '@/client';
import { assignNeighbors } from '@/helpers/assign-neighbors';
import { pendulumPortLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

export async function setPendulumsInitialState(newStates: PendulumState[]) {
  const pendulumStatesWithNeighbors = assignNeighbors(newStates);

  const requests = pendulumStatesWithNeighbors.map(
    (newState) =>
      new Promise<MessageWithState>((resolve, reject) => {
        const client = createPendulumClient(pendulumPortLUT[newState.id]);

        client.SetInitialState({ state: newState }, {}, (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          if (!response) {
            reject(
              new Error(`No response from SetInitialState for ${newState.id}`),
            );
            return;
          }
          resolve(response);
        });
      }),
  );

  return Promise.all(requests);
}
