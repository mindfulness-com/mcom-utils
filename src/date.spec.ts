import {
  daysUntil,
  getUtcOffset,
  isAfternoon,
  isEvening,
  isMorning,
  addDays,
  addMinutes,
  subMinutes,
  format,
  daysBetween,
  getMindfulDate,
} from "./date";
import { now } from "./now";
import { ensureUTC } from "./time";

describe("date", () => {
  beforeAll(() => {
    ensureUTC();
  });

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

  describe("daysUntil", () => {
    test("should return the correct number of whole days between now and a specified dateTime", () => {
      expect(daysUntil(addMinutes(addDays(now(), 5), 1))).toEqual(5);
      expect(daysUntil(subMinutes(addDays(now(), 5), 1))).toEqual(4);
    });
  });

  describe("daysBetween", () => {
    test("calculates days between two dates", () => {
      expect(
        daysBetween(
          new Date("2022-02-22 00:00:00"),
          new Date("2022-02-23 00:00:00"),
        ),
      ).toBe(1);
    });

    test("calculates days between two dates odd hours", () => {
      expect(
        daysBetween(
          new Date("2022-02-22 20:00:00"),
          new Date("2022-02-23 00:00:00"),
        ),
      ).toBe(1);
    });

    test("calculates days between two dates further apart", () => {
      expect(
        daysBetween(
          new Date("2022-02-22 12:00:00"),
          new Date("2022-02-27 00:00:00"),
        ),
      ).toBe(5);
    });
  });

  describe("format", () => {
    test("should format dates", () => {
      expect(
        format(new Date("2019-08-08T00:00:00.000Z"), "yyyy-MM-dd"),
      ).toEqual("2019-08-08");
    });

    test("should format times", () => {
      expect(
        format(new Date("2019-08-08T12:34:56.789Z"), "HH:mm:ss.SSSxxxx"),
      ).toEqual("12:34:56.789+0000");

      expect(
        format(new Date("2019-08-08T12:34:56.789+1234"), "HH:mm:ss.SSSxxxx"),
      ).toEqual("00:00:56.789+0000");
    });
  });

  describe("getMindfulDate", () => {
    const doTest = (date: string, timezone: string, expected: string) => {
      expect(getMindfulDate(new Date(date), timezone)).toEqual(expected);
    };

    test("should be 2024-09-17 just before 3am on 18th Sep 2024 in UTC", () => {
      doTest("2024-09-18T02:59:59.000Z", "UTC", "2024-09-17");
    });

    test("should be 2024-09-18 at 3am on 18th Sep 2024 in UTC", () => {
      doTest("2024-09-18T03:00:00.000Z", "UTC", "2024-09-18");
    });

    test("should be 2024-09-17 just before 3am on 18th Sep 2024 in Sydney", () => {
      doTest("2024-09-17T16:59:59.000Z", "Australia/Sydney", "2024-09-17");
    });

    test("should be 2024-09-18 at 3am on 18th Sep 2024 in Sydney", () => {
      doTest("2024-09-17T17:00:00.000Z", "Australia/Sydney", "2024-09-18");
    });

    test("should be 2024-09-17 just before 3am on 18th Sep 2024 in New York", () => {
      doTest("2024-09-18T06:59:59.000Z", "America/New_York", "2024-09-17");
    });

    test("should be 2024-09-18 at 3am on 18th Sep 2024 in New York", () => {
      doTest("2024-09-18T07:00:00.000Z", "America/New_York", "2024-09-18");
    });
  });
});
