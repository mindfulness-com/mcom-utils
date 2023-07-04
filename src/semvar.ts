import * as versionDiff from "compare-versions";

export type Platform = "IOS" | "ANDROID" | "WEB" | "ADMIN";
export type VersionNumber = string;
export type PlatformVersion = {
  ios?: VersionNumber;
  android?: VersionNumber;
  web?: VersionNumber;
  admin?: VersionNumber;
};
export type Version = VersionNumber | PlatformVersion;

const isVersionNumber = (v: Version): v is VersionNumber =>
  typeof v === "string";

const pickVersionForPlatform = (version: PlatformVersion, platform: Platform) =>
  version[platform.toLowerCase() as keyof PlatformVersion];

export const compareVersions =
  (comp: (v: string, v2: string) => boolean) =>
  (
    required: Version,
    current: { platform?: Platform; version?: VersionNumber },
  ) => {
    if (!current.platform) {
      return false;
    }

    const expected = isVersionNumber(required)
      ? required
      : pickVersionForPlatform(required, current.platform);

    if (expected === "*") {
      return true;
    }

    if (!expected || !current.version) {
      return false;
    }

    return comp(current.version, expected);
  };

export const versionOrHigher = compareVersions(
  (current, required) => versionDiff(current, required) >= 0,
);

export const versionOrLower = compareVersions(
  (current, required) => versionDiff(current, required) <= 0,
);

export const beforeVersion = compareVersions(
  (current, required) => versionDiff(current, required) < 0,
);
