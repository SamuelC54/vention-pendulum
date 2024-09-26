'use client';

import { Select, SelectTrigger, SelectValue } from '../ui/select';
import { Logo } from './logo';

export function AppHeader() {
  return (
    <div className={'flex items-center border-b px-8 py-2'}>
      <Logo />
      <span className="flex-1" />
      <Select value={undefined}>
        <SelectTrigger className="ml-4 w-[180px]">
          <SelectValue placeholder="Load a preset..." />
        </SelectTrigger>
      </Select>
    </div>
  );
}
