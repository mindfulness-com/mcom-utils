import { setTimeZone, inTimeZone } from "./timezone";

beforeEach(() => {
  if (process.env.TZ !== "UTC") {
    throw new Error("Tests should be running in UTC");
  }
});

test("Sets the timezone for a given date time", () => {
  const date = new Date("2019-07-08T00:00:00.000Z");
  const converted = setTimeZone(date, "America/Los_Angeles");

  expect(converted.toISOString()).toEqual("2019-07-08T07:00:00.000Z");
});

test("Converts a time to the given timezone", () => {
  const date = new Date("2019-07-08T00:00:00.000Z");
  const converted = inTimeZone(date, "America/Los_Angeles");

  expect(converted.toISOString()).toEqual("2019-07-07T17:00:00.000Z");
});
