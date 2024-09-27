import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { pendulumServerLUT } from '@/utils/pendulum-server-lut';

import { getQueryKey } from './_query-keys';

async function getHealthcheck(pendulumId: string) {
  const response = await axios.get(
    `${pendulumServerLUT[pendulumId]}/healthcheck`,
  );
  return response.data;
}

export const useGetHealthcheck = (pendulumId: string) => {
  return useQuery({
    queryKey: getQueryKey('healthcheck', pendulumId),
    queryFn: () => getHealthcheck(pendulumId),
    refetchInterval: 5000, // 5 seconds polling
  });
};
