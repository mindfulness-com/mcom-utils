import { resizedUrl, stringifyOptions } from "./resize";

const options = (values: Record<string, number | string>) => ({
  width: undefined,
  height: undefined,
  fit: undefined,
  position: undefined,
  ...values,
});

test("should add in options for resize", () => {
  expect(
    resizedUrl(
      "/some/url/file.jpg",
      options({
        width: 32,
        height: 32,
      }),
    ),
  ).toEqual("/some/url/file.32x32_cover_center.jpg");
});

test("options to be stringified correctly", () => {
  expect(stringifyOptions(options({ width: 32 }))).toEqual("32xauto");

  expect(stringifyOptions(options({ width: 32, height: 64 }))).toEqual(
    "32x64_cover_center", // defaults
  );

  expect(
    stringifyOptions(options({ width: 32, height: 64, fit: "COVER" })),
  ).toEqual("32x64_cover_center");
  expect(
    stringifyOptions(
      options({ width: 32, height: 64, fit: "CONTAIN", position: "RIGHT" }),
    ),
  ).toEqual("32x64_contain_east");

  expect(
    stringifyOptions(
      options({ width: 32, height: 64, fit: "CONTAIN", position: "TOP_RIGHT" }),
    ),
  ).toEqual("32x64_contain_northeast");

  expect(
    stringifyOptions(
      options({
        width: 32,
        height: 64,
        fit: "CONTAIN",
        position: "BOTTOM_LEFT",
      }),
    ),
  ).toEqual("32x64_contain_southwest");
});
