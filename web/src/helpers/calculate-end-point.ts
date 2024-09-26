export function calculateEndPoint(
  startX: number,
  startY: number,
  angle: number,
  length: number,
): { x: number; y: number } {
  const radians = (angle * Math.PI) / 180;

  const endX = startX + length * Math.sin(radians);
  const endY = startY + length * Math.cos(radians);

  return { x: endX, y: endY };
}
