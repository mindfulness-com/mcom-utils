"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraEnv = exports.Env = exports.mockEnvVar = exports.mockInfraEnv = exports.restoreEnv = void 0;
const lodash_1 = require("lodash");
const env_1 = require("./env");
Object.defineProperty(exports, "Env", { enumerable: true, get: function () { return env_1.Env; } });
Object.defineProperty(exports, "InfraEnv", { enumerable: true, get: function () { return env_1.InfraEnv; } });
const restoreEnv = () => {
    const node = process.env.NODE_ENV;
    const infra = process.env.INFRA_ENV;
    return () => {
        process.env.NODE_ENV = node;
        process.env.INFRA_ENV = infra;
    };
};
exports.restoreEnv = restoreEnv;
const mockInfraEnv = (env) => {
    const restore = (0, exports.restoreEnv)();
    if ((0, lodash_1.isUndefined)(env)) {
        delete process.env.INFRA_ENV;
    }
    else {
        process.env.INFRA_ENV = env;
    }
    return restore;
};
exports.mockInfraEnv = mockInfraEnv;
const mockEnvVar = (envVar, value) => {
    const restore = process.env[envVar];
    process.env[envVar] = value;
    return () => {
        process.env[envVar] = restore;
    };
};
exports.mockEnvVar = mockEnvVar;
//# sourceMappingURL=env.mock.js.map