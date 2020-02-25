const actual = jest.requireActual("../env");

export const getEnv = jest.fn().mockReturnValue("development");
export const getEnvVar = jest.fn(
  (name: string) => process.env[name] || "value",
);
export const getInfraEnv = () => "test";
export const getEnvVarBool = () => true;
export const getInfraSuffix = () => "-test";
export const isEnvVarSet = () => false;
export const getEnvPEM = () =>
  "-----BEGIN PUBLIC KEY-----\\ndemsecretsarereal\\n-----END PUBLIC KEY-----\\n";

export const envOption = jest.fn(actual.envOption);
export const isProduction = jest.fn(actual.isProduction);
export const isDevelopment = jest.fn(actual.isDevelopment);
export const isProdInfraEnv = jest.fn(actual.isProdInfraEnv);
export const isLocalInfraEnv = jest.fn(actual.isLocalInfraEnv);
export const skipInLocalEnv = jest.fn(actual.skipInLocalEnv);
export const skipOnProdInfraEnv = jest.fn(actual.skipOnProdInfraEnv);
export const onlyOnProdInfraEnv = jest.fn(actual.onlyOnProdInfraEnv);
export const onlyInLocalEnv = jest.fn(actual.onlyInLocalEnv);
export const Env = actual.Env;
export const InfraEnv = actual.InfraEnv;
