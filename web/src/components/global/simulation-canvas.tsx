'use client';

import { Graphics, Stage } from '@pixi/react';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { pendulumsConfigAtom } from '@/stores/general';

import { Card } from '../ui/card';
import { XMarker } from './x-marker';

const PADDING = 32;
const SIMULATION_SIZE = 100; // Size of the simulation in meters (assuming Width = Height)

function createSimToCanvasCoord(canvasSize: number) {
  return function simToCanvasCoord(coord: number) {
    return (coord / SIMULATION_SIZE) * (canvasSize - PADDING * 2) + PADDING;
  };
}

export function SimulationCanvas() {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const pendulumsConfig = useAtomValue(pendulumsConfigAtom);

  // Adjust the stage size based on the Card's size
  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const { clientWidth, clientHeight } = cardRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const simToCanvasCoord = createSimToCanvasCoord(dimensions.width);

  return (
    <Card
      ref={cardRef}
      className="size-full overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={{ background: 0xf8fafc }}
      >
        <Graphics
          draw={(g) => {
            const startX = simToCanvasCoord(0);
            const endX = simToCanvasCoord(SIMULATION_SIZE);
            const y = simToCanvasCoord(0);

            g.clear();
            g.lineStyle(12, 0x94a3b8, 1); // Line thickness, color, and alpha
            g.moveTo(startX, y); // Starting point (x, y)
            g.lineTo(endX, y); // Ending point (x, y)
          }}
        />
        {pendulumsConfig.map((pendulum) => {
          const x = simToCanvasCoord(pendulum.anchorPosition);
          const y = simToCanvasCoord(0);

          return (
            <XMarker
              key={pendulum.id}
              x={x}
              y={y}
              color={pendulum.color}
              size={8}
              lineWidth={6}
            />
          );
        })}
      </Stage>
    </Card>
  );
}
