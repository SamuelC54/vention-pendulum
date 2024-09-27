import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { pendulumServerLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

import { getQueryKey } from './_query-keys';

async function getPendulumState(pendulumId: string) {
  const response = await axios.get(
    `${pendulumServerLUT[pendulumId]}/pendulum/state`,
  );
  return response.data as PendulumState;
}

export const useGetPendulumState = (pendulumId: string, enabled: boolean) => {
  return useQuery({
    queryKey: getQueryKey('pendulum', pendulumId),
    queryFn: () => getPendulumState(pendulumId),
    refetchInterval: 30, // 30ms polling
    enabled,
  });
};
