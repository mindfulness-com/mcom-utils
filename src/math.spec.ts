import { isBetween } from "./math";

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
