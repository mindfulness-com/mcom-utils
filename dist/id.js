"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUUID = exports.memorableId = exports.fileSafeId = exports.shortId = exports.publicId = exports.generate = void 0;
const uuid_1 = require("uuid");
const nanoid_1 = require("nanoid");
// Good for checking collision propability
// https://zelark.github.io/nano-id-cc/
const alphabets = {
    default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    memorable: "123456789ABCDEFGHJKLMNPQRSTUVWXYZ",
    filename: "0123456789abcdefghijklmnopqrstuvwxyz",
};
const generate = () => (0, uuid_1.v4)();
exports.generate = generate;
const publicId = () => (0, nanoid_1.customAlphabet)(alphabets.default, 10)();
exports.publicId = publicId;
const shortId = (length = 10) => (0, nanoid_1.customAlphabet)(alphabets.default, length)();
exports.shortId = shortId;
const fileSafeId = (length = 10) => (0, nanoid_1.customAlphabet)(alphabets.filename, length)();
exports.fileSafeId = fileSafeId;
const memorableId = (length) => (0, nanoid_1.customAlphabet)(alphabets.memorable, length)();
exports.memorableId = memorableId;
const isUUID = (id) => (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) || []).length > 0;
exports.isUUID = isUUID;
//# sourceMappingURL=id.js.map