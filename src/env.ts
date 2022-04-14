import { isNil, values, includes } from "lodash";
import { Maybe } from "./maybe";
import { Primitive } from "./types";

export enum Env {
  Development = "development",
  Test = "test",
  Staging = "staging",
  Production = "production",
}

export const isDevelopment = (): boolean =>
  process.env.NODE_ENV === "development";
export const isProduction = (): boolean =>
  process.env.NODE_ENV === "production";

export const onlyRunIn = (predicate: () => boolean) => <T>(
  input: () => T,
): Maybe<T> => (predicate() ? input() : undefined);

export enum InfraEnv {
  Prod = "prod",
  Dev = "dev",
  Local = "local",
}

export const getInfraEnv = (): InfraEnv => process.env.INFRA_ENV as InfraEnv;

export const isNonProdInfraEnv = () => getInfraEnv() !== "prod";
export const isProdInfraEnv = () => getInfraEnv() === "prod";

// Include ci/cd (NODE_ENV=test) in local env definition
export const isLocalInfraEnv = () =>
  getInfraEnv() === "local" || process.env.NODE_ENV === "test";

export const skipOnProdInfraEnv = onlyRunIn(isNonProdInfraEnv);
export const onlyOnProdInfraEnv = onlyRunIn(isProdInfraEnv);
export const skipInLocalEnv = onlyRunIn(() => !isLocalInfraEnv());
export const onlyInLocalEnv = onlyRunIn(() => isLocalInfraEnv());

export const getInfraSuffix = (isPublic = false) => {
  switch (getInfraEnv()) {
    case "prod":
      return isPublic ? "" : "-prod";
    default:
      return "-dev";
  }
};

export const getEnv = (): Env => {
  const env = process.env.NODE_ENV;
  if (includes(values(Env), env)) {
    return env as Env;
  }
  throw new Error(`Env ${env} not known.`);
};

const clean = (value: Maybe<string>) =>
  value === "undefined" ? undefined : value;

export const tryGetEnvVar = (name: string) =>
  // Try find a env specific version of the var e.g. DB_CONNECTION_DEV
  clean(process.env[`${name}_${getInfraEnv().toUpperCase()}`]) ||
  // Try get the value as it is
  clean(process.env[name]);

export const isEnvVarSet = (name: string): boolean =>
  !isNil(tryGetEnvVar(name));

export const getEnvVar = (name: string): string => {
  const val = tryGetEnvVar(name);

  if (!val) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return val;
};

export const getEnvVarBool = (name: string): Maybe<boolean> => {
  const val = getEnvVar(name);

  if (val === "true" || val === "false") {
    return process.env[name] === "true";
  }

  return undefined;
};

export const envOption = (options: {
  prod: Primitive;
  dev: Primitive;
  local?: Primitive;
}) => options[getInfraEnv()] || options["dev"];
