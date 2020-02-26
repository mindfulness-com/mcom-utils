"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/node");
exports.Sentry = Sentry;
const env_1 = require("./env");
env_1.skipInLocalEnv(() => {
    Sentry.init({
        dsn: env_1.getEnvVar("SENTRY_DSN"),
        environment: env_1.getEnvVar("INFRA_ENV"),
    });
});
exports.debug = (...messages) => env_1.onlyInLocalEnv(() => console.log(...messages));
exports.log = (message, extra) => {
    env_1.onlyInLocalEnv(() => console.log(message, extra));
    if (message instanceof Error) {
        Sentry.captureException(message);
    }
    else if (typeof message === "string") {
        Sentry.captureEvent({ message, extra });
    }
    else {
        Sentry.captureEvent({ message: JSON.stringify(message), extra });
    }
};
//# sourceMappingURL=debug.js.map