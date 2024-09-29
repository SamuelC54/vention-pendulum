import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSetAtom } from 'jotai';

import { simulationStateAtom } from '@/stores/general';
import { pendulumIds, pendulumServerLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

async function pausePendulumsSimulation() {
  const requests = pendulumIds.map((id) =>
    axios.post(`${pendulumServerLUT[id]}/pendulum/stop`),
  );

  const responses = await Promise.all(requests);

  return responses.map((response) => response.data as PendulumState);
}

export const usePausePendulumsSimulation = () => {
  const setSimulationState = useSetAtom(simulationStateAtom);

  return useMutation({
    mutationFn: () => pausePendulumsSimulation(),
    onSuccess: () => {
      setSimulationState('stopped');
    },
  });
};
