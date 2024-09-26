import '../utils/globals.css';

import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import { PublicEnvScript } from 'next-runtime-env';
import React from 'react';

import { cn } from '@/lib/utils';

import { Providers } from './providers';

const font = GeistSans;

export const metadata: Metadata = {
  title: 'Vention - Pendulum Simulation',
  description: 'Simulation of pendulum motion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(font.className, 'h-full overflow-hidden')}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
