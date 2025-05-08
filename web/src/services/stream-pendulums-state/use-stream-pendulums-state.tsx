import { readStreamableValue } from 'ai/rsc';
import { useEffect, useState } from 'react';

import { PendulumState } from '@/utils/types';

import { streamPendulumsState } from './stream-pendulums-state';

export function useStreamPendulumsState(
  enabled: boolean,
): Record<string, PendulumState> {
  const [pendulumsStateRecord, setPendulumsStateRecord] = useState<
    Record<string, PendulumState>
  >({});

  useEffect(() => {
    if (!enabled) return () => {};

    let active = true;

    const startStreaming = async () => {
      const { output } = await streamPendulumsState();

      for await (const pendulumsState of readStreamableValue(output)) {
        if (!active) break;
        if (pendulumsState) {
          setPendulumsStateRecord(pendulumsState);
        }
      }
    };

    startStreaming();

    return () => {
      active = false;
    };
  }, [enabled]);

  return pendulumsStateRecord;
}
