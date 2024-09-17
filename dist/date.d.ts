export { isDate, isValid, isAfter, isBefore, isPast, isFuture, getDayOfYear, format, formatDistanceToNow, setSeconds, setMinutes, setHours, setDay, setWeek, setMonth, setYear, getSeconds, getMinutes, getHours, getDay, getWeek, getMonth, getYear, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInCalendarDays, differenceInWeeks, differenceInMonths, differenceInYears, startOfSecond, startOfMinute, startOfHour, startOfDay, startOfWeek, startOfMonth, startOfYear, endOfSecond, endOfMinute, endOfHour, endOfDay, endOfWeek, endOfMonth, endOfYear, addSeconds, addMinutes, addHours, addDays, addWeeks, addMonths, addYears, subSeconds, subMinutes, subHours, subDays, subWeeks, subMonths, subYears, } from "date-fns";
export declare const toUnix: (date: Date) => number;
export declare const fromUnix: (date: number) => Date;
export declare const getUtcOffset: (date: Date, timezone: string) => number;
export declare const isMorning: (date: Date) => boolean;
export declare const isAfternoon: (date: Date) => boolean;
export declare const isEvening: (date: Date) => boolean;
/**
 * Calculate the total number of full whole days between now and a given dateTime
 * @param {Date} d - The dateTime value to calculate the daysUntil.
 * @returns {number} - The whole number of full days between now and the
 */
export declare const daysUntil: (d: Date) => number;
export declare const daysBetween: (d: Date, d2: Date) => number;
export declare const isBetweenDates: (d: Date, [start, end]: [Date, Date]) => boolean;
export declare const today: () => Date;
export declare const getHourOfYear: (n: Date) => number;
export declare const unixDate: (d: number) => Date;
export declare const unixTimestamp: (d: Date) => number;
/**
 * A date string in the format "yyyy-MM-dd"
 */
export type DateString = string;
/**
 * Calculate the "mindful date" for a given dateTime.
 * The "mindful date" runs from 3am to 3am on the following day.
 * @param {Date} d - The dateTime value for which to calculate the "mindful date".
 * @param {string} timezone - The timezone in which to calculate the "mindful date".
 * @returns {number} - The "mindful date" represented by the date and timezone
 */
export declare const getMindfulDate: (d: Date, timezone: string) => DateString;
