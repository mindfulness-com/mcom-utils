import * as toTime from "to-time";

// https://github.com/hafuta/to-time
export const toSeconds = (time: string): number => {
  const result = toTime(time).seconds();
  if (time && !result) {
    throw new Error(`Invalid ISO860 duration: ${time}`);
  }
  return result;
};

export const toMilliSeconds = (time: string): number => toSeconds(time) * 100;

export const toMinutes = (seconds: number): number => Math.round(seconds / 60);

import { now } from "./now";

export * from "./now";

export const ensureUTC = () => {
  if (process.env.TZ !== "UTC") {
    throw new Error("Should be running in UTC.");
  }
};

const round = (num: number) => {
  const rounded = Math.floor(Math.abs(num));
  return `${rounded < 10 ? "0" : ""}${rounded}`;
};

export const formatOffsetInUTC = (offset: number) =>
  `${offset <= 0 ? "+" : "-"}${round(offset / 60)}${round(offset % 60)}`;

export const isLessThan = (timeA: Date, timeB: Date) =>
  timeA.getTime() < timeB.getTime();
export const isGreaterThan = (timeA: Date, timeB: Date) =>
  timeA.getTime() > timeB.getTime();

export const inFuture = (timeA: Date) => isGreaterThan(timeA, now());
export const inPast = (timeA: Date) => isLessThan(timeA, now());
