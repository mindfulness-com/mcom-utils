import {
  convertToLocalTime,
  convertToTimeZone,
  formatToTimeZone,
} from "date-fns-timezone";

// Takes the exisint UTC date and set the disired timezone
// Used to take an absolute time (e.g. this launches on 02 Dec 00:00)
// and "cast" it into a timezone.
export const setTimeZone = (time: Date, timeZone: string): Date =>
  convertToLocalTime(time, { timeZone });

// What time is it in the timezone
export const inTimeZone = (time: Date, timeZone: string): Date =>
  convertToTimeZone(time, { timeZone });

// What time is it in the timezone
export const formatInTimeZone = (
  date: Date,
  format: string,
  timeZone: string,
): string => formatToTimeZone(date, format, { timeZone });
