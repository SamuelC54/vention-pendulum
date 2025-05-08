'use server';

import { createStreamableValue } from 'ai/rsc';

import createPendulumClient from '@/client';
import { fromGrpcPendulumState } from '@/helpers/converter';
import { pendulumPortLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

export async function streamPendulumState(pendulumId: string) {
  const stream = createStreamableValue<PendulumState>();

  const client = createPendulumClient(pendulumPortLUT[pendulumId]);
  const grpcStream = client.StreamPendulumState({}, {});

  grpcStream.on('data', (data) => {
    const state = fromGrpcPendulumState(data);
    stream.update(state);
  });

  grpcStream.on('error', (err) => {
    console.error(`Stream error on ${pendulumId}:`, err);
    stream.done();
  });

  grpcStream.on('end', () => {
    console.warn(`Stream ended for ${pendulumId}`);
    stream.done();
  });

  return { output: stream.value };
}
