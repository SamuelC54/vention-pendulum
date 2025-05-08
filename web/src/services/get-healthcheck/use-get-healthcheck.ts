'use client';

import { useQuery } from '@tanstack/react-query';

import { getQueryKey } from '../_query-keys';
import { getHealthcheck } from './get-healthcheck';

export const useGetHealthcheck = (pendulumId: string) => {
  return useQuery({
    queryKey: getQueryKey('healthcheck', pendulumId),
    queryFn: () => getHealthcheck(pendulumId),
    refetchInterval: 60000, // 1 min polling
  });
};
