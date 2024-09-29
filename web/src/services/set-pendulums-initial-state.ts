import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';

import { assignNeighbors } from '@/helpers/assign-neighbors';
import { simulationStateAtom } from '@/stores/general';
import { pendulumServerLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

async function setPendulumsInitialState(newStates: PendulumState[]) {
  const pendulumStatesWithNeighbors = assignNeighbors(newStates);

  const requests = pendulumStatesWithNeighbors.map((newState) =>
    axios.post(
      `${pendulumServerLUT[newState.id]}/pendulum/set-initial-state`,
      newState,
    ),
  );

  const responses = await Promise.all(requests);

  return responses.map((response) => response.data as PendulumState);
}

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
