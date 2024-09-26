'use client';

import { Graphics, Stage } from '@pixi/react';
import { useEffect, useRef, useState } from 'react';

import { Card } from '../ui/card';

export function SimulationCanvas() {
  const cardRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

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
            g.clear();
            g.lineStyle(12, 0x94a3b8, 1); // Line thickness, color, and alpha
            g.moveTo(32, 32); // Starting point (x, y)
            g.lineTo(dimensions.width - 32, 32); // Ending point (x, y)
          }}
        />
        <XMarker
          x={32}
          y={32}
          color={0xff0000} // Color of the X
        />
      </Stage>
    </Card>
  );
}

export function XMarker({
  x = 0,
  y = 0,
  size = 10,
  color = 0xff0000,
  lineWidth = 6,
}) {
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.lineStyle(lineWidth, color, 1);

        // Draw first diagonal line from top-left to bottom-right
        g.moveTo(-size, -size);
        g.lineTo(size, size);

        // Draw second diagonal line from top-right to bottom-left
        g.moveTo(size, -size);
        g.lineTo(-size, size);
      }}
      x={x}
      y={y}
    />
  );
}
