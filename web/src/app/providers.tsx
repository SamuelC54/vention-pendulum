import { Provider } from 'jotai';
import React from 'react';

import { ReactQueryClientProvider } from '@/lib/react-query/react-query-client-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryClientProvider>
      <Provider>{children}</Provider>
    </ReactQueryClientProvider>
  );
};
