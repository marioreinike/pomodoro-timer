export function formatSecondstoString(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const minutesString = `${minutes}`.padStart(2, '0');
  const remainingSeconds = seconds % 60;
  const remainingSecondsString = `${remainingSeconds}`.padStart(2, '0');
  return `${minutesString}:${remainingSecondsString}`;
}
