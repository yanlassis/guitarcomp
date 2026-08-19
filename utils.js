export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function isValidLoop(loopStart, loopEnd) {
  return loopStart !== null && loopEnd !== null && loopStart < loopEnd;
}
