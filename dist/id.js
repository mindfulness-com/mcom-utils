"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid/v4");
const nanoid = require("nanoid/generate");
// Good for checking collision propability
// https://zelark.github.io/nano-id-cc/
const alphabets = {
    default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    memorable: "123456789ABCDEFGHJKLMNPQRSTUVWXYZ",
    filename: "0123456789abcdefghijklmnopqrstuvwxyz",
};
exports.generate = () => uuid();
exports.publicId = () => nanoid(alphabets.default, 10);
exports.shortId = (length = 10) => nanoid(alphabets.default, length);
exports.fileSafeId = (length = 10) => nanoid(alphabets.filename, length);
exports.memorableId = (length) => nanoid(alphabets.memorable, length);
//# sourceMappingURL=id.js.map