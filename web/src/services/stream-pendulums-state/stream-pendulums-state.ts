'use server';

import { createStreamableValue } from 'ai/rsc';

import createPendulumClient from '@/client';
import { fromGrpcPendulumState } from '@/helpers/converter';
import { pendulumIds, pendulumPortLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

export async function streamPendulumsState() {
  const stream = createStreamableValue<Record<string, PendulumState>>();
  const current: Record<string, PendulumState> = {};

  await Promise.all(
    pendulumIds.map(async (pendulumId) => {
      const client = createPendulumClient(pendulumPortLUT[pendulumId]);
      const grpcStream = client.StreamPendulumState({}, {});

      grpcStream.on('data', (data) => {
        const state = fromGrpcPendulumState(data);
        current[pendulumId] = state;

        // Stream full updated record
        stream.update({ ...current });
      });

      grpcStream.on('error', (err) => {
        console.error(`Stream error on ${pendulumId}:`, err);
      });

      grpcStream.on('end', () => {
        console.warn(`Stream ended for ${pendulumId}`);
      });
    }),
  );

  return { output: stream.value };
}
