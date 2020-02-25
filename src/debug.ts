/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Sentry from "@sentry/node";
import { getEnvVar, skipInLocalEnv, onlyInLocalEnv } from "./env";

skipInLocalEnv(() => {
  Sentry.init({
    dsn: getEnvVar("SENTRY_DSN"),
    environment: getEnvVar("INFRA_ENV"),
  });
});

export const debug = (...messages: any[]) =>
  onlyInLocalEnv(() => console.log(...messages));

export const log = (
  message: Error | string | Record<string, any>,
  extra?: Record<string, any>,
) => {
  onlyInLocalEnv(() => console.log(message, extra));

  if (message instanceof Error) {
    Sentry.captureException(message);
  } else if (typeof message === "string") {
    Sentry.captureEvent({ message, extra });
  } else {
    Sentry.captureEvent({ message: JSON.stringify(message), extra });
  }
};

export { Sentry };
