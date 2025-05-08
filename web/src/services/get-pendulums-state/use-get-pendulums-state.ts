import { useQuery } from '@tanstack/react-query';

import { getQueryKey } from '../_query-keys';
import { getPendulumsState } from './get-pendulums-state';

export const useGetPendulumsState = (enabled: boolean) => {
  return useQuery({
    queryKey: getQueryKey('pendulums'),
    queryFn: () => getPendulumsState(),
    refetchInterval: 30, // 30ms polling
    enabled,
  });
};
