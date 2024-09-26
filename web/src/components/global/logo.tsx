'use client';

import Image from 'next/image';

export function Logo() {
  return (
    <div className={'flex items-center gap-4'}>
      <div className="flex h-8 items-center">
        <Image
          priority
          src="/vention-logo-vector.svg"
          alt="Vention"
          width={160}
          height={160}
        />
      </div>
      <div className="text-center font-semibold">Pendulums Simulation</div>
    </div>
  );
}
