'use client';

import { UseMutationResult } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { useSetPendulumInitialState } from '@/services/set-pendulum-initial-state';
import { pendulumsConfigAtom } from '@/stores/general';
import { PendulumState } from '@/utils/types';

import { Button } from '../ui/button';
import { PendulumCard } from './pendulum-card';

export function Controls() {
  const pendulumsConfig = useAtomValue(pendulumsConfigAtom);

  const setPendulum1InitialState = useSetPendulumInitialState('1');
  const setPendulum2InitialState = useSetPendulumInitialState('2');
  const setPendulum3InitialState = useSetPendulumInitialState('3');
  const setPendulum4InitialState = useSetPendulumInitialState('4');
  const setPendulum5InitialState = useSetPendulumInitialState('5');

  function handleStartSimulation() {
    const setPendulumInitialStateLUT: Record<
      string,
      UseMutationResult<any, Error, PendulumState, unknown>
    > = {
      '1': setPendulum1InitialState,
      '2': setPendulum2InitialState,
      '3': setPendulum3InitialState,
      '4': setPendulum4InitialState,
      '5': setPendulum5InitialState,
    };

    for (const pendulumConfig of pendulumsConfig) {
      const setPendulumInitialStateMutation =
        setPendulumInitialStateLUT[pendulumConfig.id];

      setPendulumInitialStateMutation.mutate(pendulumConfig);
    }
  }

  return (
    <div className={'flex w-[300px] flex-col gap-2'}>
      <div className="text-sm">Controls</div>
      <Button onClick={handleStartSimulation}>Start Simulation</Button>
      <div className="mt-2 flex items-center">
        <div className="text-sm">Pendulums</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          Count: {pendulumsConfig.length}
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto px-2">
        {pendulumsConfig.map((config) => (
          <PendulumCard key={config.id} id={config.id} />
        ))}
      </div>
    </div>
  );
}
