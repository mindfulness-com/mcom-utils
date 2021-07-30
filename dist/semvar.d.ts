export declare type Platform = "IOS" | "ANDROID" | "WEB" | "ADMIN";
export declare type VersionNumber = string;
export declare type PlatformVersion = {
    ios?: VersionNumber;
    android?: VersionNumber;
    web?: VersionNumber;
    admin?: VersionNumber;
};
export declare type Version = VersionNumber | PlatformVersion;
export declare const compareVersions: (comp: (v: string, v2: string) => boolean) => (required: Version, current: {
    platform?: "IOS" | "ANDROID" | "WEB" | "ADMIN" | undefined;
    version?: string | undefined;
}) => boolean;
export declare const versionOrHigher: (required: Version, current: {
    platform?: "IOS" | "ANDROID" | "WEB" | "ADMIN" | undefined;
    version?: string | undefined;
}) => boolean;
export declare const versionOrLower: (required: Version, current: {
    platform?: "IOS" | "ANDROID" | "WEB" | "ADMIN" | undefined;
    version?: string | undefined;
}) => boolean;
export declare const beforeVersion: (required: Version, current: {
    platform?: "IOS" | "ANDROID" | "WEB" | "ADMIN" | undefined;
    version?: string | undefined;
}) => boolean;
