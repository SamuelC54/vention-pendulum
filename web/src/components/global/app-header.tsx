'use client';

import { Logo } from './logo';

export function AppHeader() {
  return (
    <div className={'flex items-center border-b px-8 py-2'}>
      <Logo />
      <span className="flex-1" />
      <div className="text-sm italic text-gray-500">
        Made by{' '}
        <a href="https://samuelcroteau.com" className="text-blue-500 underline">
          Samuel Croteau
        </a>
      </div>{' '}
    </div>
  );
}
