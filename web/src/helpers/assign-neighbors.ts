import { pendulumServerLUT } from '@/utils/pendulum-server-lut';
import { PendulumState } from '@/utils/types';

export function assignNeighbors(pendulums: PendulumState[]): PendulumState[] {
  const sortedPendulums = pendulums.sort(
    (a, b) => a.anchorPosition.x - b.anchorPosition.x,
  );

  const updatedPendulums = sortedPendulums.map((pendulum, index) => {
    const updatedPendulum = { ...pendulum };
    updatedPendulum.neighborsURL = [];

    if (index > 0) {
      const leftNeighbor = sortedPendulums[index - 1];
      const leftNeighborURL = pendulumServerLUT[leftNeighbor.id];

      if (leftNeighborURL) {
        updatedPendulum.neighborsURL.push(leftNeighborURL);
      }
    }

    if (index < sortedPendulums.length - 1) {
      const rightNeighbor = sortedPendulums[index + 1];
      const rightNeighborURL = pendulumServerLUT[rightNeighbor.id];

      if (rightNeighborURL) {
        updatedPendulum.neighborsURL.push(rightNeighborURL);
      }
    }

    return updatedPendulum;
  });

  return updatedPendulums;
}
