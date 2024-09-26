import { atom } from 'jotai';

export const currentPresetAtom = atom('1');

const initialPendulum = {
  anchorPosition: 33,
  startingAngle: 0,
  mass: 1,
  length: 1,
  radius: 0.1,
  color: '#ff0000',
};

export const pendulumsConfigAtom = atom(
  Array(5)
    .fill({})
    .map((_, index) => ({
      ...initialPendulum,
      id: index.toString(),
    })),
);
