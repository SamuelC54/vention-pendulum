import '../utils/globals.css';

import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';
import React from 'react';

import { AppHeader } from '@/components/global/app-header';
import { Controls } from '@/components/global/controls';
import { SimulationCanvas } from '@/components/global/simulation-canvas';
import { ReactQueryClientProvider } from '@/lib/react-query/react-query-client-provider';
import { cn } from '@/lib/utils';

const font = GeistSans;

export const metadata: Metadata = {
  title: 'Vention - Pendulum Simulation',
  description: 'Simulation of pendulum motion',
};

export default function Page() {
  return (
    <ReactQueryClientProvider>
      <html lang="en" className="h-full">
        <head>
          <PublicEnvScript />
        </head>
        <body
          className={cn(font.className, 'h-full overflow-hidden')}
          suppressHydrationWarning={true}
        >
          <div className="flex h-full flex-col">
            <AppHeader />
            <div className="flex h-full flex-1 gap-6 overflow-hidden p-4">
              <SimulationCanvas />
              <Controls />
            </div>
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
