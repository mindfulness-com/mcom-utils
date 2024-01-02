import {
  getHours,
  differenceInDays,
  differenceInCalendarDays,
  startOfDay,
  getDayOfYear,
} from "date-fns";
import { getUTCOffset, findTimeZone } from "timezone-support";

import { isBetween } from "./math";
import { now } from "./now";
import { isGreaterThan, isLessThan } from "./time";

// raw date-fns exports
export {
  isDate,
  isValid,
  isAfter,
  isBefore,
  isPast,
  isFuture,
  getDayOfYear,
  format,
  formatDistanceToNow,
  setSeconds,
  setMinutes,
  setHours,
  setDay,
  setWeek,
  setMonth,
  setYear,
  getSeconds,
  getMinutes,
  getHours,
  getDay,
  getWeek,
  getMonth,
  getYear,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInCalendarDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  startOfSecond,
  startOfMinute,
  startOfHour,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfSecond,
  endOfMinute,
  endOfHour,
  endOfDay,
  endOfWeek,
  endOfMonth,
  endOfYear,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subSeconds,
  subMinutes,
  subHours,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns";

export const toUnix = (date: Date): number => Math.round(date.getTime() / 1000);

export const fromUnix = (date: number) => new Date(date * 1000);

export const getUtcOffset = (date: Date, timezone: string) =>
  getUTCOffset(date, findTimeZone(timezone)).offset;

export const isMorning = (date: Date) => isBetween(getHours(date), [4, 11]);
export const isAfternoon = (date: Date) => isBetween(getHours(date), [12, 17]);
export const isEvening = (date: Date) =>
  isBetween(getHours(date), [18, 24]) || isBetween(getHours(date), [0, 3]);

/**
 * Calculate the total number of full whole days between now and a given dateTime
 * @param {Date} d - The dateTime value to calculate the daysUntil.
 * @returns {number} - The whole number of full days between now and the
 */
export const daysUntil = (d: Date) => Math.abs(differenceInDays(now(), d));

export const daysBetween = (d: Date, d2: Date) =>
  Math.abs(differenceInCalendarDays(d, d2));

export const isBetweenDates = (d: Date, [start, end]: [Date, Date]): boolean =>
  isGreaterThan(d, start) && isLessThan(d, end);

export const today = () => startOfDay(now());

export const getHourOfYear = (n: Date) => getDayOfYear(n) * 24 + getHours(n);

export const unixDate = (d: number) => new Date(d * 1000);

export const unixTimestamp = (d: Date) => Math.floor(d.getTime() / 1000);
