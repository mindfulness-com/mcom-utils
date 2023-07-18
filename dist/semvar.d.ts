export type Platform = "IOS" | "ANDROID" | "WEB" | "ADMIN";
export type VersionNumber = string;
export type PlatformVersion = {
    ios?: VersionNumber;
    android?: VersionNumber;
    web?: VersionNumber;
    admin?: VersionNumber;
};
export type Version = VersionNumber | PlatformVersion;
export declare const compareVersions: (comp: (v: string, v2: string) => boolean) => (required: Version, current: {
    platform?: Platform;
    version?: VersionNumber;
}) => boolean;
export declare const versionOrHigher: (required: Version, current: {
    platform?: Platform;
    version?: VersionNumber;
}) => boolean;
export declare const versionOrLower: (required: Version, current: {
    platform?: Platform;
    version?: VersionNumber;
}) => boolean;
export declare const beforeVersion: (required: Version, current: {
    platform?: Platform;
    version?: VersionNumber;
}) => boolean;
