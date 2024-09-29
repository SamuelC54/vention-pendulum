import { atom } from 'jotai';

import { degreesToRads } from '@/helpers/angles';
import { PendulumState } from '@/utils/types';

type PresetLUT = Record<string, PendulumState[]>;

// Lookup table for different presets
const presetLUT: PresetLUT = {
  'preset-1': [
    {
      id: '1',
      anchorPosition: { x: 10, y: 0 },
      angle: degreesToRads(10),
      length: 10,
      radius: 2,
      color: '#3498db',
      velocity: 0,
      state: 'running',
      hasCollision: false,
      neighborsURL: [],
    },
    {
      id: '2',
      anchorPosition: { x: 20, y: 0 },
      angle: degreesToRads(-15),
      length: 20,
      radius: 3,
      color: '#2ecc71',
      velocity: 0,
      state: 'running',
      hasCollision: false,
      neighborsURL: [],
    },
    {
      id: '3',
      anchorPosition: { x: 30, y: 0 },
      angle: degreesToRads(5),
      length: 30,
      radius: 1,
      color: '#f1c40f',
      velocity: 0,
      state: 'running',
      hasCollision: false,
      neighborsURL: [],
    },
    {
      id: '4',
      anchorPosition: { x: 40, y: 0 },
      angle: degreesToRads(-10),
      length: 15,
      radius: 5,
      color: '#e74c3c',
      velocity: 0,
      state: 'running',
      hasCollision: false,
      neighborsURL: [],
    },
    {
      id: '5',
      anchorPosition: { x: 43, y: 0 },
      angle: degreesToRads(42),
      length: 17,
      radius: 2,
      color: '#9b59b6',
      velocity: 0,
      state: 'running',
      hasCollision: false,
      neighborsURL: [],
    },
  ],
};

export const currentPresetAtom = atom('preset-1');
export const pendulumsConfigAtom = atom(presetLUT['preset-1']);

export type SimulationState = 'running' | 'stopped' | 'off';
export const simulationStateAtom = atom<SimulationState>('off');
