import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { pendulumIds, pendulumServerLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

import { getQueryKey } from './_query-keys';

async function getPendulumsState() {
  const requests = pendulumIds.map((id) =>
    axios.get(`${pendulumServerLUT[id]}/pendulum/state`),
  );

  const responses = await Promise.all(requests);

  return responses.map((response) => response.data as PendulumState);
}

export const useGetPendulumsState = (enabled: boolean) => {
  return useQuery({
    queryKey: getQueryKey('pendulums'),
    queryFn: () => getPendulumsState(),
    refetchInterval: 30, // 30ms polling
    enabled,
  });
};
