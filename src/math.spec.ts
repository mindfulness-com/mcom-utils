import { isBetween, isMultipleOf, percentOf } from "./math";

describe("math", () => {
  describe("isBetween", () => {
    const tests: (any[] & { 0: number; 1: [number, number]; 2: boolean })[] = [
      [50, [10, 99], true],
      [9, [10, 99], false],
      [10, [10, 99], true],
      [100, [10, 99], false],
      [99, [10, 99], true],
      [-9, [10, 99], false],
      [-9, [-10, 99], true],
      [-50, [-99, -10], true],
    ];

    test.each(tests)("%p isBetween %p should be %p", (...args) => {
      const [num, between, expected] = args;
      expect(isBetween(num, between)).toEqual(expected);
    });
  });

  describe("isMultipleOf", () => {
    const tests: (any[] & { 0: number; 1: number; 2: boolean })[] = [
      [1, 10, false],
      [10, 1, true],
      [5, 2, false],
      [4, 2, true],
    ];

    test.each(tests)("%p isMultipleOf %p should be %p", (...args) => {
      const [num, multiple, expected] = args;
      expect(isMultipleOf(num, multiple)).toEqual(expected);
    });
  });

  describe("percentOf", () => {
    const tests: (any[] & { 0: number; 1: number; 2: number })[] = [
      [1, 10, 10],
      [12, 50, 24],
      [33, 33, 100],
    ];

    test.each(tests)("%p percentOf %p should be %p", (...args) => {
      const [current, max, expected] = args;
      expect(percentOf(current, max)).toEqual(expected);
    });
  });
});
