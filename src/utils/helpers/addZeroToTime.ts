export const addZeroToTime = (time: number): string | number => {
  if (time >= 0 && time < 10) {
    return `${0}${time}`;
  }
  return time;
};
