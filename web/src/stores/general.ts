import { atom } from 'jotai';

// Lookup table for different presets
const presetLUT = {
  'preset-1': [
    {
      id: '1',
      anchorPosition: 20,
      startingAngle: 10,
      mass: 1.2,
      length: 1.5,
      radius: 0.1,
      color: '#3498db', // Blue
    },
    {
      id: '2',
      anchorPosition: 30,
      startingAngle: -15,
      mass: 0.8,
      length: 1.2,
      radius: 0.1,
      color: '#2ecc71', // Green
    },
    {
      id: '3',
      anchorPosition: 40,
      startingAngle: 5,
      mass: 1.5,
      length: 1.3,
      radius: 0.1,
      color: '#f1c40f', // Yellow
    },
    {
      id: '4',
      anchorPosition: 50,
      startingAngle: -10,
      mass: 1.0,
      length: 1.4,
      radius: 0.1,
      color: '#e74c3c', // Red
    },
    {
      id: '5',
      anchorPosition: 60,
      startingAngle: 20,
      mass: 1.3,
      length: 1.1,
      radius: 0.1,
      color: '#9b59b6', // Purple
    },
  ],
};

export const currentPresetAtom = atom('preset-1');
export const pendulumsConfigAtom = atom(presetLUT['preset-1']);
