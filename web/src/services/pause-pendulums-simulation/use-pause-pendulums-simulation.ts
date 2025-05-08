import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { simulationStateAtom } from '@/stores/general';

import { pausePendulumsSimulation } from './pause-pendulums-simulation';

export const usePausePendulumsSimulation = () => {
  const setSimulationState = useSetAtom(simulationStateAtom);

  return useMutation({
    mutationFn: () => pausePendulumsSimulation(),
    onSuccess: () => {
      setSimulationState('stopped');
    },
  });
};
