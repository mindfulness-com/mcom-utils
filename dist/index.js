"use strict";
// Cleaner syntax coming in 3.8
// https://devblogs.microsoft.com/typescript/announcing-typescript-3-8-beta/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.math = exports.semvar = exports.sql = exports.timezone = exports.maybe = exports.definitely = exports.definetly = exports.cache = exports.promise = exports.logic = exports.fn = exports.date = exports.time = exports.profile = exports.env = exports.array = exports.debug = exports.object = exports.id = exports.error = exports.currency = exports.boolean = void 0;
const boolean = __importStar(require("./boolean"));
exports.boolean = boolean;
const currency = __importStar(require("./currency"));
exports.currency = currency;
const error = __importStar(require("./error"));
exports.error = error;
const id = __importStar(require("./id"));
exports.id = id;
const object = __importStar(require("./object"));
exports.object = object;
const array = __importStar(require("./array"));
exports.array = array;
const env = __importStar(require("./env"));
exports.env = env;
const profile = __importStar(require("./profile"));
exports.profile = profile;
const time = __importStar(require("./time"));
exports.time = time;
const date = __importStar(require("./date"));
exports.date = date;
const debug = __importStar(require("./debug"));
exports.debug = debug;
const fn = __importStar(require("./fn"));
exports.fn = fn;
const logic = __importStar(require("./logic"));
exports.logic = logic;
const promise = __importStar(require("./promise"));
exports.promise = promise;
const cache = __importStar(require("./cache"));
exports.cache = cache;
const definetly = __importStar(require("./definetly"));
exports.definetly = definetly;
const definitely = __importStar(require("./definitely"));
exports.definitely = definitely;
const semvar = __importStar(require("./semvar"));
exports.semvar = semvar;
const maybe = __importStar(require("./maybe"));
exports.maybe = maybe;
const timezone = __importStar(require("./timezone"));
exports.timezone = timezone;
const sql = __importStar(require("./sql"));
exports.sql = sql;
const math = __importStar(require("./math"));
exports.math = math;
//# sourceMappingURL=index.js.map