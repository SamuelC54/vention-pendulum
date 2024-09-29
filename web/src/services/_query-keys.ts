type QueryKeyCombinations = ['healthcheck', string] | ['pendulums'];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
