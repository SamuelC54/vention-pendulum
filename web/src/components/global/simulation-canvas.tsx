'use client';

import { Container, Graphics, Stage } from '@pixi/react';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';

import { pendulumsConfigAtom } from '@/stores/general';

import { Card } from '../ui/card';
import { XMarker } from './x-marker';

const PADDING = 32;
const SIMULATION_SIZE = 100; // Size of the simulation in meters (Width = Height)

function createSimToCanvasCoord(canvasSize: number) {
  return function simToCanvasCoord(coord: number) {
    return (coord / SIMULATION_SIZE) * canvasSize;
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

  const containerWidth = dimensions.width - PADDING * 2;
  const simToCanvasCoord = createSimToCanvasCoord(containerWidth);

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
        <Container
          position={[PADDING, PADDING]}
          width={containerWidth}
          height={containerWidth}
        >
          <Graphics
            draw={(g) => {
              g.clear();
              g.lineStyle(12, 0x94a3b8, 1); // Line thickness, color, and alpha
              g.moveTo(0, 0); // Starting point (x, y)
              g.lineTo(simToCanvasCoord(100), 0); // Ending point (x, y)
            }}
          />
          {pendulumsConfig.map((pendulum) => {
            const x = simToCanvasCoord(pendulum.anchorPosition);
            const y = simToCanvasCoord(0);

            return (
              <XMarker key={pendulum.id} x={x} y={y} color={pendulum.color} />
            );
          })}
        </Container>
      </Stage>
    </Card>
  );
}
