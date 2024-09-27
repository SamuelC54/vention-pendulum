type QueryKeyCombinations = ['healthcheck', string] | ['pendulum', string];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
