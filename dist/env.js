"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
var Env;
(function (Env) {
    Env["Development"] = "development";
    Env["Test"] = "test";
    Env["Staging"] = "staging";
    Env["Production"] = "production";
})(Env = exports.Env || (exports.Env = {}));
exports.isDevelopment = () => process.env.NODE_ENV === "development";
exports.isProduction = () => process.env.NODE_ENV === "production";
exports.onlyRunIn = (predicate) => (input) => (predicate() ? input() : undefined);
var InfraEnv;
(function (InfraEnv) {
    InfraEnv["Prod"] = "prod";
    InfraEnv["Dev"] = "dev";
    InfraEnv["Local"] = "local";
})(InfraEnv = exports.InfraEnv || (exports.InfraEnv = {}));
exports.getInfraEnv = () => process.env.INFRA_ENV;
exports.isNonProdInfraEnv = () => exports.getInfraEnv() !== "prod";
exports.isProdInfraEnv = () => exports.getInfraEnv() === "prod";
// Include ci/cd (NODE_ENV=test) in local env definition
exports.isLocalInfraEnv = () => exports.getInfraEnv() === "local" || process.env.NODE_ENV === "test";
exports.skipOnProdInfraEnv = exports.onlyRunIn(exports.isNonProdInfraEnv);
exports.onlyOnProdInfraEnv = exports.onlyRunIn(exports.isProdInfraEnv);
exports.skipInLocalEnv = exports.onlyRunIn(() => !exports.isLocalInfraEnv());
exports.onlyInLocalEnv = exports.onlyRunIn(() => exports.isLocalInfraEnv());
exports.getInfraSuffix = (isPublic = false) => {
    switch (exports.getInfraEnv()) {
        case "prod":
            return isPublic ? "" : "-prod";
        default:
            return "-dev";
    }
};
exports.getEnv = () => {
    const env = process.env.NODE_ENV;
    if (lodash_1.includes(lodash_1.values(Env), env)) {
        return env;
    }
    throw new Error(`Env ${env} not known.`);
};
exports.isEnvVarSet = (name) => {
    return !lodash_1.isNil(process.env[name]);
};
exports.getEnvVar = (name) => {
    const val = process.env[`${name}_${exports.getInfraEnv().toUpperCase()}`] || process.env[name];
    if (!val) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return val;
};
exports.getEnvVarBool = (name) => {
    const val = exports.getEnvVar(name);
    if (val === "true" || val === "false") {
        return process.env[name] === "true";
    }
    return undefined;
};
exports.envOption = (options) => options[exports.getInfraEnv()] || options["dev"];
//# sourceMappingURL=env.js.map