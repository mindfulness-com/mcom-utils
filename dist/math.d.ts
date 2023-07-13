/**
 * Return true if the number is between the two numbers
 * @param {Number} num - The number to check
 * @param {[Number, Number]} range - The range to check against
 * @returns {boolean} - Whether the number is between the two numbers
 */
export declare const isBetween: (num: number, [from, to]: [number, number]) => boolean;
/**
 * Return true if the number is a multiple of another number
 * @param {Number} number - The number to check
 * @param {Number} multiple - The multiple to check against
 * @returns {boolean} - Whether the number is a multiple of the other number
 */
export declare const isMultipleOf: (number: number, multiple: number) => boolean;
/**
 * Return the percentage of the current number compared to the max number
 * @param {Number} current - The current number
 * @param {Number} max - The max number
 * @returns {Number} - The percentage
 */
export declare const percentOf: (current: number, max: number) => number;
