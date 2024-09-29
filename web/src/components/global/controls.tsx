'use client';

import { useAtomValue } from 'jotai';

import { useContinuePendulumsSimulation } from '@/services/continue-pendulums-simulation';
import { usePausePendulumsSimulation } from '@/services/pause-pendulums-simulation';
import { useSetPendulumsInitialState } from '@/services/set-pendulums-initial-state';
import { useStopPendulumsSimulation } from '@/services/stop-pendulums-simulation';
import { pendulumsConfigAtom, simulationStateAtom } from '@/stores/general';

import { Button } from '../ui/button';
import { PendulumCard } from './pendulum-card';

export function Controls() {
  const pendulumsConfig = useAtomValue(pendulumsConfigAtom);
  const simulationState = useAtomValue(simulationStateAtom);
  const pausePendulumsSimulation = usePausePendulumsSimulation();
  const stopPendulumsSimulation = useStopPendulumsSimulation();
  const continuePendulumsSimulation = useContinuePendulumsSimulation();

  const setPendulumsInitialState = useSetPendulumsInitialState();

  return (
    <div className={'flex w-[300px] flex-col gap-2'}>
      <div className="text-sm">Controls</div>
      {simulationState === 'off' && (
        <Button
          onClick={() => {
            setPendulumsInitialState.mutate(pendulumsConfig);
          }}
        >
          Start Simulation
        </Button>
      )}
      {simulationState !== 'off' && (
        <div className="flex gap-2">
          {simulationState === 'running' && (
            <Button
              variant={'outline'}
              className="flex-1"
              onClick={() => {
                pausePendulumsSimulation.mutate();
              }}
            >
              Pause
            </Button>
          )}
          {simulationState === 'stopped' && (
            <Button
              variant={'outline'}
              className="flex-1"
              onClick={() => {
                continuePendulumsSimulation.mutate();
              }}
            >
              Continue
            </Button>
          )}
          <Button
            className="flex-1"
            onClick={() => {
              stopPendulumsSimulation.mutate();
            }}
          >
            Stop
          </Button>
        </div>
      )}
      <div className="mt-2 flex items-center">
        <div className="text-sm">Pendulums</div>
        <span className="flex-1" />
        <div className="text-xs text-slate-600">
          Count: {pendulumsConfig.length}
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto px-2">
        {pendulumsConfig.map((config) => (
          <PendulumCard
            key={config.id}
            id={config.id}
            disabled={simulationState !== 'off'}
          />
        ))}
      </div>
    </div>
  );
}
