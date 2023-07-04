"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envOption = exports.getEnvVarBool = exports.getEnvVar = exports.isEnvVarSet = exports.tryGetEnvVar = exports.getEnv = exports.getInfraSuffix = exports.onlyInLocalEnv = exports.skipInLocalEnv = exports.onlyOnProdInfraEnv = exports.skipOnProdInfraEnv = exports.isLocalInfraEnv = exports.isProdInfraEnv = exports.isNonProdInfraEnv = exports.getInfraEnv = exports.InfraEnv = exports.onlyRunIn = exports.isProduction = exports.isDevelopment = exports.Env = void 0;
const lodash_1 = require("lodash");
var Env;
(function (Env) {
    Env["Development"] = "development";
    Env["Test"] = "test";
    Env["Staging"] = "staging";
    Env["Production"] = "production";
})(Env = exports.Env || (exports.Env = {}));
const isDevelopment = () => process.env.NODE_ENV === "development";
exports.isDevelopment = isDevelopment;
const isProduction = () => process.env.NODE_ENV === "production";
exports.isProduction = isProduction;
const onlyRunIn = (predicate) => (input) => predicate() ? input() : undefined;
exports.onlyRunIn = onlyRunIn;
var InfraEnv;
(function (InfraEnv) {
    InfraEnv["Prod"] = "prod";
    InfraEnv["Dev"] = "dev";
    InfraEnv["Local"] = "local";
})(InfraEnv = exports.InfraEnv || (exports.InfraEnv = {}));
const getInfraEnv = () => process.env.INFRA_ENV;
exports.getInfraEnv = getInfraEnv;
const isNonProdInfraEnv = () => (0, exports.getInfraEnv)() !== "prod";
exports.isNonProdInfraEnv = isNonProdInfraEnv;
const isProdInfraEnv = () => (0, exports.getInfraEnv)() === "prod";
exports.isProdInfraEnv = isProdInfraEnv;
// Include ci/cd (NODE_ENV=test) in local env definition
const isLocalInfraEnv = () => (0, exports.getInfraEnv)() === "local" || process.env.NODE_ENV === "test";
exports.isLocalInfraEnv = isLocalInfraEnv;
exports.skipOnProdInfraEnv = (0, exports.onlyRunIn)(exports.isNonProdInfraEnv);
exports.onlyOnProdInfraEnv = (0, exports.onlyRunIn)(exports.isProdInfraEnv);
exports.skipInLocalEnv = (0, exports.onlyRunIn)(() => !(0, exports.isLocalInfraEnv)());
exports.onlyInLocalEnv = (0, exports.onlyRunIn)(() => (0, exports.isLocalInfraEnv)());
const getInfraSuffix = (isPublic = false) => {
    switch ((0, exports.getInfraEnv)()) {
        case "prod":
            return isPublic ? "" : "-prod";
        default:
            return "-dev";
    }
};
exports.getInfraSuffix = getInfraSuffix;
const getEnv = () => {
    const env = process.env.NODE_ENV;
    if ((0, lodash_1.includes)((0, lodash_1.values)(Env), env)) {
        return env;
    }
    throw new Error(`Env ${env} not known.`);
};
exports.getEnv = getEnv;
const clean = (value) => value === "undefined" ? undefined : value;
const tryGetEnvVar = (name) => 
// Try find a env specific version of the var e.g. DB_CONNECTION_DEV
clean(process.env[`${name}_${(0, exports.getInfraEnv)().toUpperCase()}`]) ||
    // Try get the value as it is
    clean(process.env[name]);
exports.tryGetEnvVar = tryGetEnvVar;
const isEnvVarSet = (name) => !(0, lodash_1.isNil)((0, exports.tryGetEnvVar)(name));
exports.isEnvVarSet = isEnvVarSet;
const getEnvVar = (name) => {
    const val = (0, exports.tryGetEnvVar)(name);
    if (!val) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return val;
};
exports.getEnvVar = getEnvVar;
const getEnvVarBool = (name) => {
    const val = (0, exports.getEnvVar)(name);
    if (val === "true" || val === "false") {
        return process.env[name] === "true";
    }
    return undefined;
};
exports.getEnvVarBool = getEnvVarBool;
const envOption = (options) => options[(0, exports.getInfraEnv)()] || options["dev"];
exports.envOption = envOption;
//# sourceMappingURL=env.js.map