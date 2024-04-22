jest.unmock("./env");

import {
  getEnv,
  getEnvVarBool,
  getEnvVar,
  tryGetEnvVar,
  isEnvVarSet,
  InfraEnv,
  skipOnProdInfraEnv,
} from "./env";
import { mockInfraEnv, restoreEnv } from "./env.mock";

describe("env", () => {
  afterEach(restoreEnv());

  describe("skipOnProdEnv", () => {
    test("should only run in non-prod infra envs", () => {
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
  });

  describe("getEnvVar", () => {
    test("should get envs with infra suffix", () => {
      process.env.FOO = "BARxxx";
      process.env.FOO_PROD = "BAR";

      mockInfraEnv(InfraEnv.Dev);
      expect(getEnvVar("FOO")).toBe("BARxxx");

      mockInfraEnv(InfraEnv.Prod);
      expect(getEnvVar("FOO")).toBe("BAR");
    });

    test("should not cast boolean vars to bool", () => {
      process.env.isBlah = "true";
      expect(getEnvVar("isBlah")).toBe("true");
      delete process.env.isBlah;
    });

    test("should get env vars from process.env", () => {
      process.env.blah = "test";
      expect(getEnvVar("blah")).toBe("test");
      delete process.env.blah;
    });
  });

  describe("getEnvVarBool", () => {
    test("should cast boolean vars to bool", () => {
      process.env.isBlah = "true";
      process.env.blah = "truth is nice.";
      expect(getEnvVarBool("isBlah")).toBe(true);
      expect(getEnvVarBool("blah")).toBeUndefined();
      delete process.env.isBlah;
      delete process.env.blah;
    });
  });

  describe("isEnvVarSet", () => {
    test("should test that env vars are set", () => {
      process.env.blah = "false";
      expect(isEnvVarSet("blah")).toBe(true);
      process.env.blah = "value";
      expect(isEnvVarSet("blah")).toBe(true);

      delete process.env.blah;
      expect(isEnvVarSet("blah")).toBe(false);
    });
  });

  describe("getEnv", () => {
    test("should only return valid env variables", () => {
      process.env.NODE_ENV = "development";
      expect(getEnv()).toBe("development");

      process.env.NODE_ENV = "production";
      expect(getEnv()).toBe("production");

      process.env.NODE_ENV = "error";
      expect(getEnv).toThrow();
    });
  });

  describe("tryGetEnvVar", () => {
    test("should not throw errors for for undefined env vars", () => {
      process.env.empty = undefined;
      expect(tryGetEnvVar("empty")).toBeUndefined();
      delete process.env.empty;
    });

    test("should return undefined for serverless 'undefined' values", () => {
      process.env.SERVERLESS_EMPTY = "undefined";
      expect(tryGetEnvVar("SERVERLESS_EMPTY")).toBeUndefined();
      delete process.env.SERVERLESS_EMPTY;
    });
  });
});
