import * as Sentry from "@sentry/node";
import { getEnvVar, skipInLocalEnv, onlyInLocalEnv } from "./env";

skipInLocalEnv(() => {
  Sentry.init({
    dsn: getEnvVar("SENTRY_DSN"),
    environment: getEnvVar("INFRA_ENV"),
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debug = (...messages: any[]) =>
  onlyInLocalEnv(() => console.log(...messages));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const log = (message: Error | string | Record<string, any>) => {
  console.log(message);

  if (message instanceof Error) {
    Sentry.captureException(message);
  } else if (typeof message === "string") {
    Sentry.captureMessage(message);
  } else {
    Sentry.captureMessage(JSON.stringify(message));
  }
};

export { Sentry };
