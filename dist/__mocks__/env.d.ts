/// <reference types="jest" />
export declare const getEnv: jest.Mock<any, any>;
export declare const getEnvVar: jest.Mock<string, [string]>;
export declare const getInfraEnv: () => string;
export declare const getEnvVarBool: () => boolean;
export declare const getInfraSuffix: () => string;
export declare const isEnvVarSet: () => boolean;
export declare const getEnvPEM: () => string;
export declare const envOption: jest.Mock<{}, any[]>;
export declare const isProduction: jest.Mock<{}, any[]>;
export declare const isDevelopment: jest.Mock<{}, any[]>;
export declare const isProdInfraEnv: jest.Mock<{}, any[]>;
export declare const isLocalInfraEnv: jest.Mock<{}, any[]>;
export declare const skipInLocalEnv: jest.Mock<{}, any[]>;
export declare const skipOnProdInfraEnv: jest.Mock<{}, any[]>;
export declare const onlyOnProdInfraEnv: jest.Mock<{}, any[]>;
export declare const onlyInLocalEnv: jest.Mock<{}, any[]>;
export declare const Env: any;
export declare const InfraEnv: any;
