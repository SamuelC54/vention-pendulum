import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { simulationStateAtom } from '@/stores/general';

import { stopPendulumsSimulation } from './stop-pendulums-simulation';

export const useStopPendulumsSimulation = () => {
  const setSimulationState = useSetAtom(simulationStateAtom);

  return useMutation({
    mutationFn: () => stopPendulumsSimulation(),
    onSuccess: () => {
      setSimulationState('off');
    },
  });
};
