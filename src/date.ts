import { getHours, differenceInDays } from "date-fns";
import { getUTCOffset, findTimeZone } from "timezone-support";

import { isBetween } from "./math";
import { now } from "./now";

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
