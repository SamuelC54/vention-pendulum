'use client';

import { Graphics, Stage } from '@pixi/react';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';

import { calculateEndPoint } from '@/helpers/calculate-end-point';
import { useGetPendulumsState } from '@/services/get-pendulums-state';
import { pendulumsConfigAtom, simulationStateAtom } from '@/stores/general';
import { PendulumState } from '@/utils/types';

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
  const simulationState = useAtomValue(simulationStateAtom);

  const isSimulationRunning = simulationState !== 'off';

  const { data: serverPendulumState } =
    useGetPendulumsState(isSimulationRunning);

  const pendulums: PendulumState[] = !isSimulationRunning
    ? pendulumsConfig
    : serverPendulumState || [];

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
        options={{ background: 0xf8fafc, resolution: 2 }}
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
        {pendulums.map((pendulum) => {
          const x = simToCanvasCoord(pendulum.anchorPosition.x);
          const y = simToCanvasCoord(pendulum.anchorPosition.y);
          const endPoint = calculateEndPoint(
            pendulum.anchorPosition.x,
            pendulum.anchorPosition.y,
            pendulum.angle,
            pendulum.length,
          );

          const endX = simToCanvasCoord(endPoint.x);
          const endY = simToCanvasCoord(endPoint.y);

          return (
            <React.Fragment key={pendulum.id}>
              {/* Shaft */}
              <Graphics
                draw={(g) => {
                  g.clear();
                  g.lineStyle(4, pendulum.color, 1); // Line thickness, color, and alpha
                  g.moveTo(x, y); // Starting point (x, y)
                  g.lineTo(endX, endY); // Ending point (x, y)
                }}
              />
              {/* Anchor */}
              <XMarker
                key={pendulum.id}
                x={x}
                y={y}
                color={pendulum.color}
                size={8}
                lineWidth={6}
              />
              {/* Mass */}
              <Graphics
                draw={(g) => {
                  g.clear();
                  g.beginFill(pendulum.color);
                  g.drawCircle(endX, endY, pendulum.radius);
                  g.endFill();
                }}
              />
            </React.Fragment>
          );
        })}
      </Stage>
    </Card>
  );
}
