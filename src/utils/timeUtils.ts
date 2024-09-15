// Convert ms to minutes
export const formatDuration = (lengthMs: number): string => {
  const minutes = Math.floor(lengthMs / 60000);
  const seconds = Math.floor((lengthMs % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};
