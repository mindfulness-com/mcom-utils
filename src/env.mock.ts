import { isUndefined } from "lodash";
import { Env, InfraEnv } from "./env";

export const restoreEnv = (): (() => void) => {
  const node = process.env.NODE_ENV;
  const infra = process.env.INFRA_ENV;
  return () => {
    process.env.NODE_ENV = node;
    process.env.INFRA_ENV = infra;
  };
};

export const mockInfraEnv = (env: InfraEnv | undefined): (() => void) => {
  const restore = restoreEnv();
  if (isUndefined(env)) {
    delete process.env.INFRA_ENV;
  } else {
    process.env.INFRA_ENV = env;
  }
  return restore;
};

export const mockEnvVar = (envVar: string, value: string): (() => void) => {
  const restore = process.env[envVar];
  process.env[envVar] = value;
  return () => {
    process.env[envVar] = restore;
  };
};

export { Env, InfraEnv };
