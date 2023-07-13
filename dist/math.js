"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentOf = exports.isMultipleOf = exports.isBetween = void 0;
/**
 * Return true if the number is between the two numbers
 * @param {Number} num - The number to check
 * @param {[Number, Number]} range - The range to check against
 * @returns {boolean} - Whether the number is between the two numbers
 */
const isBetween = (num, [from, to]) => num <= to && num >= from;
exports.isBetween = isBetween;
/**
 * Return true if the number is a multiple of another number
 * @param {Number} number - The number to check
 * @param {Number} multiple - The multiple to check against
 * @returns {boolean} - Whether the number is a multiple of the other number
 */
const isMultipleOf = (number, multiple) => number % multiple === 0;
exports.isMultipleOf = isMultipleOf;
/**
 * Return the percentage of the current number compared to the max number
 * @param {Number} current - The current number
 * @param {Number} max - The max number
 * @returns {Number} - The percentage
 */
const percentOf = (current, max) => {
    return (current / max) * 100;
};
exports.percentOf = percentOf;
//# sourceMappingURL=math.js.map