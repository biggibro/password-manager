export const sleep = (ms: number = 600): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
