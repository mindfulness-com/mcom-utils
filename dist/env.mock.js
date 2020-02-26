"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
exports.Env = env_1.Env;
exports.InfraEnv = env_1.InfraEnv;
exports.restoreEnv = () => {
    const node = process.env.NODE_ENV;
    const infra = process.env.INFRA_ENV;
    return () => {
        process.env.NODE_ENV = node;
        process.env.INFRA_ENV = infra;
    };
};
exports.mockInfraEnv = (env) => {
    const restore = exports.restoreEnv();
    process.env.INFRA_ENV = env;
    return restore;
};
exports.mockEnvVar = (envVar, value) => {
    const restore = process.env[envVar];
    process.env[envVar] = value;
    return () => {
        process.env[envVar] = restore;
    };
};
//# sourceMappingURL=env.mock.js.map