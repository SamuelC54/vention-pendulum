import { useAtomValue } from 'jotai';

import { useGetPendulumState } from '@/services/get-pendulum-state';
import { simulationStateAtom } from '@/stores/general';
import { PendulumState } from '@/utils/types';

export const useGetAllPendulumState = (): PendulumState[] => {
  const simulationState = useAtomValue(simulationStateAtom);
  const isSimulationRunning = simulationState === 'running';

  const pendulum1 = useGetPendulumState('1', isSimulationRunning);
  const pendulum2 = useGetPendulumState('2', isSimulationRunning);
  const pendulum3 = useGetPendulumState('3', isSimulationRunning);
  const pendulum4 = useGetPendulumState('4', isSimulationRunning);
  const pendulum5 = useGetPendulumState('5', isSimulationRunning);

  const pendulumStates = [
    pendulum1.data && !pendulum1.isLoading && !pendulum1.error
      ? pendulum1.data
      : null,
    pendulum2.data && !pendulum2.isLoading && !pendulum2.error
      ? pendulum2.data
      : null,
    pendulum3.data && !pendulum3.isLoading && !pendulum3.error
      ? pendulum3.data
      : null,
    pendulum4.data && !pendulum4.isLoading && !pendulum4.error
      ? pendulum4.data
      : null,
    pendulum5.data && !pendulum5.isLoading && !pendulum5.error
      ? pendulum5.data
      : null,
  ];

  return pendulumStates.filter((data) => data !== null);
};
