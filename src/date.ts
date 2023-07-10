import { getHours } from "date-fns";
import * as tzSupport from "timezone-support";

import { isBetween } from "./math";

export const toUnix = (date: Date): number => Math.round(date.getTime() / 1000);

export const fromUnix = (date: number) => new Date(date * 1000);

export const getUtcOffset = (date: Date, timezone: string) =>
  tzSupport.getUTCOffset(date, tzSupport.findTimeZone(timezone)).offset;

export const isMorning = (date: Date) => isBetween(getHours(date), [4, 11]);
export const isAfternoon = (date: Date) => isBetween(getHours(date), [12, 17]);
export const isEvening = (date: Date) =>
  isBetween(getHours(date), [18, 24]) || isBetween(getHours(date), [0, 3]);
