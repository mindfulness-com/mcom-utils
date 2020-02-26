jest.unmock("./env");

import { readFileSync } from "fs";
import { join } from "path";
import {
  getEnv,
  getEnvVarBool,
  getEnvVar,
  isEnvVarSet,
  InfraEnv,
  skipOnProdInfraEnv,
} from "./env";
import { mockInfraEnv, restoreEnv } from "./env.mock";

afterEach(restoreEnv());

test("skipOnProdEnv only runs in non-prod infra envs", () => {
  let run = 0;

  mockInfraEnv(InfraEnv.Dev);
  skipOnProdInfraEnv(() => {
    run += 1;
  });
  expect(run).toBe(1);

  mockInfraEnv(InfraEnv.Prod);
  skipOnProdInfraEnv(() => {
    run += 1;
  });
  expect(run).toBe(1);
});

test("should get envs with infra suffix", () => {
  process.env.FOO = "BARxxx";
  process.env.FOO_PROD = "BAR";

  mockInfraEnv(InfraEnv.Dev);
  expect(getEnvVar("FOO")).toBe("BARxxx");

  mockInfraEnv(InfraEnv.Prod);
  expect(getEnvVar("FOO")).toBe("BAR");
});

test("only returns valid env variables", () => {
  process.env.NODE_ENV = "development";
  expect(getEnv()).toBe("development");

  process.env.NODE_ENV = "production";
  expect(getEnv()).toBe("production");

  process.env.NODE_ENV = "error";
  expect(getEnv).toThrow();
});

test("should get env vars from process.env", () => {
  process.env.blah = "test";
  expect(getEnvVar("blah")).toBe("test");
  delete process.env.blah;
});

test("should not cast boolean vars to bool", () => {
  process.env.isBlah = "true";
  expect(getEnvVar("isBlah")).toBe("true");
  delete process.env.isBlah;
});

test("should get bools from getEnvVarBool", () => {
  process.env.isBlah = "true";
  process.env.blah = "truth is nice.";
  expect(getEnvVarBool("isBlah")).toBe(true);
  expect(getEnvVarBool("blah")).toBeUndefined();
  delete process.env.isBlah;
  delete process.env.blah;
});

test("should test for truthy", () => {
  process.env.blah = "false";
  expect(isEnvVarSet("blah")).toBe(true);
  process.env.blah = "value";
  expect(isEnvVarSet("blah")).toBe(true);

  delete process.env.blah;
  expect(isEnvVarSet("blah")).toBe(false);
});

test("environment variables are loaded from .env file", () => {
  const secrets = readFileSync(join(__dirname, "../.env")).toString();
  expect(secrets.length).toBeGreaterThan(0);
});
