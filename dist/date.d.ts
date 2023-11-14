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
