import { isBetween, isMultipleOf, percentOf } from "./math";

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

test("isMultipleOf", () => {
  expect(isMultipleOf(1, 10)).toBe(false);
  expect(isMultipleOf(10, 1)).toBe(true);
  expect(isMultipleOf(5, 2)).toBe(false);
  expect(isMultipleOf(4, 2)).toBe(true);
});

test("percentOf", () => {
  expect(percentOf(1, 10)).toBe(10);
  expect(percentOf(12, 50)).toBe(24);
  expect(percentOf(33, 33)).toBe(100);
});
