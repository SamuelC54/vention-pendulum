import { atom } from 'jotai';

// Lookup table for different presets
const presetLUT = {
  'preset-1': [
    {
      id: '1',
      anchorPosition: 20,
      startingAngle: 10,
      mass: 8.5,
      length: 10,
      radius: 12,
      color: '#3498db',
    },
    {
      id: '2',
      anchorPosition: 30,
      startingAngle: -15,
      mass: 7.0,
      length: 20,
      radius: 30,
      color: '#2ecc71',
    },
    {
      id: '3',
      anchorPosition: 40,
      startingAngle: 5,
      mass: 9.5,
      length: 30,
      radius: 10,
      color: '#f1c40f',
    },
    {
      id: '4',
      anchorPosition: 50,
      startingAngle: -10,
      mass: 6.8,
      length: 15,
      radius: 50,
      color: '#e74c3c',
    },
    {
      id: '5',
      anchorPosition: 60,
      startingAngle: -18,
      mass: 8.0,
      length: 25,
      radius: 25,
      color: '#9b59b6',
    },
  ],
};

export const currentPresetAtom = atom('preset-1');
export const pendulumsConfigAtom = atom(presetLUT['preset-1']);
