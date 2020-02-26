export declare enum Env {
    Development = "development",
    Test = "test",
    Staging = "staging",
    Production = "production"
}
export declare const isDevelopment: () => boolean;
export declare const isProduction: () => boolean;
export declare const onlyRunIn: (predicate: () => boolean) => <T>(input: () => T) => Maybe<T>;
export declare enum InfraEnv {
    Prod = "prod",
    Dev = "dev",
    Local = "local"
}
export declare const getInfraEnv: () => InfraEnv;
export declare const isNonProdInfraEnv: () => boolean;
export declare const isProdInfraEnv: () => boolean;
export declare const isLocalInfraEnv: () => boolean;
export declare const skipOnProdInfraEnv: <T>(input: () => T) => Maybe<T>;
export declare const onlyOnProdInfraEnv: <T>(input: () => T) => Maybe<T>;
export declare const skipInLocalEnv: <T>(input: () => T) => Maybe<T>;
export declare const onlyInLocalEnv: <T>(input: () => T) => Maybe<T>;
export declare const getInfraSuffix: (isPublic?: boolean) => "" | "-prod" | "-dev";
export declare const getEnv: () => Env;
export declare const isEnvVarSet: (name: string) => boolean;
export declare const getEnvVar: (name: string) => string;
export declare const getEnvVarBool: (name: string) => boolean | undefined;
export declare const getEnvPEM: (name: string) => string;
export declare const envOption: (options: {
    prod: string;
    dev: string;
    local?: Maybe<string>;
}) => string;
