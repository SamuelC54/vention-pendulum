export function calculateEndPoint(
  startX: number,
  startY: number,
  angle: number,
  length: number,
): { x: number; y: number } {
  const endX = startX + length * Math.sin(angle);
  const endY = startY + length * Math.cos(angle);

  return { x: endX, y: endY };
}
