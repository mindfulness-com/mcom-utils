import * as tzSupport from "timezone-support";

export const toUnix = (date: Date): number => Math.round(date.getTime() / 1000);

export const fromUnix = (date: number) => new Date(date * 1000);

export const getUtcOffset = (date: Date, timezone: string) =>
  tzSupport.getUTCOffset(date, tzSupport.findTimeZone(timezone)).offset;
