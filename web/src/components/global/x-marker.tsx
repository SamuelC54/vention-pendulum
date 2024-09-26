import { Graphics } from '@pixi/react';

interface Props {
  x: number;
  y: number;
  size: number;
  color: string;
  lineWidth: number;
}

export function XMarker(props: Props) {
  const { x, y, size, color, lineWidth } = props;

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
