import * as toTime from "to-time";

// https://github.com/hafuta/to-time
export const toSeconds = (time: string): number => {
  const result = toTime(time).seconds();
  if (time && !result) {
    throw new Error(`Invalid ISO860 duration: ${time}`);
  }
  return result;
};

export const toMinutes = (seconds: number): number => Math.round(seconds / 60);
