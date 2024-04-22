import { versionOrHigher } from "./semvar";

describe("semvar", () => {
  describe("versionOrHigher", () => {
    test("when greater than and required version as a string", () => {
      expect(
        versionOrHigher("1.0.23", { version: "1.0.24", platform: "IOS" }),
      ).toBe(true);

      expect(
        versionOrHigher("1.0.23", { version: "1.0.24", platform: "ANDROID" }),
      ).toBe(true);
    });

    test("when greater than and required version as platform specific", () => {
      expect(
        versionOrHigher(
          { ios: "1.0.23", android: "1.0.29" },
          { version: "1.0.24", platform: "IOS" },
        ),
      ).toBe(true);

      expect(
        versionOrHigher(
          { ios: "1.0.29", android: "1.0.23" },
          { version: "1.0.24", platform: "ANDROID" },
        ),
      ).toBe(true);
    });

    test("when context version is missing", () => {
      expect(versionOrHigher("1.0.23", {})).toBe(false);

      expect(versionOrHigher({ ios: "1.0.29", android: "1.0.23" }, {})).toBe(
        false,
      );
    });
  });
});
