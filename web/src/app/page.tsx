import React from 'react';

import { AppHeader } from '@/components/global/app-header';
import { Controls } from '@/components/global/controls';
import { SimulationCanvas } from '@/components/global/simulation-canvas';

export default function Page() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader />
      <div className="flex h-full flex-1 gap-6 overflow-hidden p-4">
        <SimulationCanvas />
        <Controls />
      </div>
    </div>
  );
}
