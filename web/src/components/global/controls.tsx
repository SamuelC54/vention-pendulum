'use client';

import { useAtomValue } from 'jotai';

import { pendulumsConfigAtom } from '@/stores/general';

import { Button } from '../ui/button';
import { PendulumCard } from './pendulum-card';

export function Controls() {
  const pendulumsConfig = useAtomValue(pendulumsConfigAtom);

  return (
    <div className={'flex w-[300px] flex-col gap-2'}>
      <div className="text-sm">Controls</div>
      <Button>Start Simulation</Button>
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
