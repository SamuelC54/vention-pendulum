import { Graphics } from '@pixi/react';

export function XMarker({
  x = 0,
  y = 0,
  size = 10,
  color = 'ff0000',
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
