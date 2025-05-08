'use server';

import createPendulumClient from '@/client';
import { fromGrpcPendulumState } from '@/helpers/converter';
import { pendulumPortLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

export async function subscribeToPendulumState(
  pendulumId: string,
): Promise<ReadableStream<PendulumState>> {
  const client = createPendulumClient(pendulumPortLUT[pendulumId]);
  const stream = client.StreamPendulumState({}, {});

  return new ReadableStream<PendulumState>({
    start(controller) {
      stream.on('data', (data) => {
        const state = fromGrpcPendulumState(data);
        controller.enqueue(state);
      });

      stream.on('error', (err) => {
        console.error(`Stream error on ${pendulumId}:`, err);
        controller.error(err);
      });

      stream.on('end', () => {
        console.warn(`Stream ended for ${pendulumId}`);
        controller.close();
      });
    },

    cancel() {
      stream.cancel();
    },
  });
}
