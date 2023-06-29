// format seconds to string (e.g. 01:30)
export function formatSecondstoString(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const minutesString = `${minutes}`.padStart(2, '0');
  const remainingSeconds = seconds % 60;
  const remainingSecondsString = `${remainingSeconds}`.padStart(2, '0');
  return `${minutesString}:${remainingSecondsString}`;
}

// format seconds to string readable format (e.g. 1h 30m 2s)
export function formatSecondsToReadableString(seconds: number): string {
  if (seconds === 0) {
    return '0s';
  }
  const hours = Math.floor(seconds / 3600);
  const hoursString = hours > 0 ? `${hours}h ` : '';
  const minutes = Math.floor((seconds % 3600) / 60);
  const minutesString = minutes > 0 ? `${minutes}m ` : '';
  const remainingSeconds = seconds % 60;
  const remainingSecondsString = remainingSeconds > 0 ? `${remainingSeconds}s` : '';
  return `${hoursString}${minutesString}${remainingSecondsString}`;
}
