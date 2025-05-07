export const pendulumIds = ['1', '2', '3', '4', '5'];

export const pendulumPortLUT: Record<string, string | undefined> = {
  '1': process.env.NEXT_PUBLIC_PENDULUM_1_PORT,
  '2': process.env.NEXT_PUBLIC_PENDULUM_2_PORT,
  '3': process.env.NEXT_PUBLIC_PENDULUM_3_PORT,
  '4': process.env.NEXT_PUBLIC_PENDULUM_4_PORT,
  '5': process.env.NEXT_PUBLIC_PENDULUM_5_PORT,
};
