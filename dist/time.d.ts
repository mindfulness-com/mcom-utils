export declare const toSeconds: (timeOrMins: string | number) => number;
export declare const toMilliSeconds: (time: string) => number;
export declare const toMinutes: (seconds: number) => number;
export * from "./now";
export declare const ensureUTC: () => void;
export declare const formatOffsetInUTC: (offset: number) => string;
export declare const isLessThan: (timeA: Date, timeB: Date) => boolean;
export declare const isGreaterThan: (timeA: Date, timeB: Date) => boolean;
export declare const inFuture: (timeA: Date) => boolean;
export declare const inPast: (timeA: Date) => boolean;
/**
 * Takes a date and sets the time to the end of the day.
 * @param date - The date to set the time to the end of the day.
 * @returns {Date} - The provided date, but with the time set to the end of the day.
 */
export declare const endOfDay: (date: Date) => Date;
