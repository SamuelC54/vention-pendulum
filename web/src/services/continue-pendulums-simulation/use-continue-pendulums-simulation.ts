import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { simulationStateAtom } from '@/stores/general';

import { continuePendulumsSimulation } from './continue-pendulums-simulation';

export const useContinuePendulumsSimulation = () => {
  const setSimulationState = useSetAtom(simulationStateAtom);

  return useMutation({
    mutationFn: () => continuePendulumsSimulation(),
    onSuccess: () => {
      setSimulationState('running');
    },
  });
};
