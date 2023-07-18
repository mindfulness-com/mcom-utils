import { getUtcOffset, isAfternoon, isEvening, isMorning } from "./date";

describe("date", () => {
  describe("getUtcOffset", () => {
    test("gets utc timezone offset correctly", () => {
      expect(getUtcOffset(new Date(2019, 5, 22), "Australia/Sydney")).toBe(
        -600,
      );
    });
  });

  describe("isMorning, isAfternoon, isEvening", () => {
    const tests: (any[] & {
      0: number;
      1: boolean; // isMorning
      2: boolean; // isAfternoon
      3: boolean; // isEvening
    })[] = [
      [0, false, false, true],
      [1, false, false, true],
      [2, false, false, true],
      [3, false, false, true],
      [4, true, false, false],
      [5, true, false, false],
      [6, true, false, false],
      [7, true, false, false],
      [8, true, false, false],
      [9, true, false, false],
      [10, true, false, false],
      [11, true, false, false],
      [12, false, true, false],
      [13, false, true, false],
      [14, false, true, false],
      [15, false, true, false],
      [16, false, true, false],
      [17, false, true, false],
      [18, false, false, true],
      [19, false, false, true],
      [20, false, false, true],
      [21, false, false, true],
      [22, false, false, true],
      [23, false, false, true],
      [24, false, false, true], // same as 0 o'clock
    ];

    test.each(tests)(
      "%p o'clock should be isMorning(%p), isAfternoon(%p), isEvening(%p)",
      (...args) => {
        const [
          hour,
          expectedIsMorning,
          expectedIsAfternoon,
          expectedIsEvening,
        ] = args;
        const date = new Date(2023, 6, 28, hour);
        expect(isMorning(date)).toEqual(expectedIsMorning);
        expect(isAfternoon(date)).toEqual(expectedIsAfternoon);
        expect(isEvening(date)).toEqual(expectedIsEvening);
      },
    );

    test.each(tests)(
      "%p o'clock should be one, and only one of isMorning, isAfternoon, or isEvening",
      (...args) => {
        const [, ...isTimeOfDays] = args;
        expect(isTimeOfDays.filter(b => b).length).toEqual(1);
      },
    );

    test("just before a threshold should be outside that threshold", () => {
      const date = new Date(2023, 6, 28, 11, 59, 59, 999);
      expect(isMorning(date)).toEqual(true);
      expect(isAfternoon(date)).toEqual(false);
    });
  });
});
