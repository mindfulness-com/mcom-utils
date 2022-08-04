"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memorableId = exports.fileSafeId = exports.shortId = exports.publicId = exports.generate = void 0;
const uuid = require("uuid/v4");
const nanoid = require("nanoid/generate");
// Good for checking collision propability
// https://zelark.github.io/nano-id-cc/
const alphabets = {
    default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    memorable: "123456789ABCDEFGHJKLMNPQRSTUVWXYZ",
    filename: "0123456789abcdefghijklmnopqrstuvwxyz",
};
const generate = () => uuid();
exports.generate = generate;
const publicId = () => nanoid(alphabets.default, 10);
exports.publicId = publicId;
const shortId = (length = 10) => nanoid(alphabets.default, length);
exports.shortId = shortId;
const fileSafeId = (length = 10) => nanoid(alphabets.filename, length);
exports.fileSafeId = fileSafeId;
const memorableId = (length) => nanoid(alphabets.memorable, length);
exports.memorableId = memorableId;
//# sourceMappingURL=id.js.map