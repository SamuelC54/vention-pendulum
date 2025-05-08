import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { simulationStateAtom } from '@/stores/general';
import { PendulumState } from '@/utils/types';

import { setPendulumsInitialState } from './set-pendulums-initial-state';

export const useSetPendulumsInitialState = () => {
  const setSimulationState = useSetAtom(simulationStateAtom);

  return useMutation({
    mutationFn: (newStates: PendulumState[]) =>
      setPendulumsInitialState(newStates),
    onSuccess: () => {
      setSimulationState('running');
    },
  });
};
