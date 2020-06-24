import { isNil, values, includes } from "lodash";
import { readFileSync } from "fs";
import { hyphenCase } from "change-case";
import { Maybe } from "./maybe";

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

export const isEnvVarSet = (name: string): boolean => {
  return !isNil(process.env[name]);
};

export const getEnvVar = (name: string): string => {
  const val =
    process.env[`${name}_${getInfraEnv().toUpperCase()}`] || process.env[name];

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

// PEM secret files
export const getEnvPEM = (name: string): string => {
  let pem = process.env[name];

  if (pem) {
    // Replace newlines from environment variable formatting
    pem = pem.replace(/\\n/gi, "\n");
  }

  // Try read from certs folder
  if (!pem) {
    const certName = hyphenCase(name).toLowerCase();
    const certFile = `${__dirname}/../../certs/${certName}.pem`;
    try {
      pem = readFileSync(certFile).toString();
    } catch {
      console.log(`No cert found in cert folder with name: ${certName}`);
      // Throw error later
    }
  }

  if (!pem) {
    throw new Error(`Missing environment variable PEM key: ${name}`);
  }
  return pem;
};

export const envOption = (options: {
  prod: string;
  dev: string;
  local?: string;
}) => options[getInfraEnv()] || options["dev"];
