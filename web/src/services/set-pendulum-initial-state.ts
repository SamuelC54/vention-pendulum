import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';

import { simulationStateAtom } from '@/stores/general';
import { pendulumServerLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

async function setPendulumInitialState(
  pendulumId: string,
  newState: PendulumState,
) {
  const response = await axios.post(
    `${pendulumServerLUT[pendulumId]}/pendulum/set-initial-state`,
    newState,
  );
  return response.data;
}

export const useSetPendulumInitialState = (pendulumId: string) => {
  const setSimulationState = useSetAtom(simulationStateAtom);

  return useMutation({
    mutationFn: (newState: PendulumState) =>
      setPendulumInitialState(pendulumId, newState),
    onSuccess: () => {
      setSimulationState('running');
    },
  });
};
