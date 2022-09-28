import * as uuid from "uuid/v4";
import nanoid = require("nanoid/generate");

// Good for checking collision propability
// https://zelark.github.io/nano-id-cc/

const alphabets = {
  default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  memorable: "123456789ABCDEFGHJKLMNPQRSTUVWXYZ",
  filename: "0123456789abcdefghijklmnopqrstuvwxyz",
};

export const generate = (): string => uuid();
export const publicId = (): string => nanoid(alphabets.default, 10);

export const shortId = (length = 10): string =>
  nanoid(alphabets.default, length);

export const fileSafeId = (length = 10): string =>
  nanoid(alphabets.filename, length);

export const memorableId = (length: number): string =>
  nanoid(alphabets.memorable, length);

export const isUUID = (id: string) =>
  (
    id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    ) || []
  ).length > 0;
