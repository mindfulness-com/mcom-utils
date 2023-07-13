/**
 * Return true if the number is between the two numbers
 * @param {Number} num - The number to check
 * @param {[Number, Number]} range - The range to check against
 * @returns {boolean} - Whether the number is between the two numbers
 */
export const isBetween = (num: number, [from, to]: [number, number]): boolean =>
  num <= to && num >= from;

/**
 * Return true if the number is a multiple of another number
 * @param {Number} number - The number to check
 * @param {Number} multiple - The multiple to check against
 * @returns {boolean} - Whether the number is a multiple of the other number
 */
export const isMultipleOf = (number: number, multiple: number): boolean =>
  number % multiple === 0;

/**
 * Return the percentage of the current number compared to the max number
 * @param {Number} current - The current number
 * @param {Number} max - The max number
 * @returns {Number} - The percentage
 */
export const percentOf = (current: number, max: number): number => {
  return (current / max) * 100;
};
