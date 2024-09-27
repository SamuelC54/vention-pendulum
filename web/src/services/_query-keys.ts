type QueryKeyCombinations = ['healthcheck', string];

export const getQueryKey = (
  ...args: QueryKeyCombinations
): QueryKeyCombinations => args;
