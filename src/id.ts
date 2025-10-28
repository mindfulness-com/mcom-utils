import { customAlphabet } from "nanoid";

// Good for checking collision propability
// https://zelark.github.io/nano-id-cc/

const alphabets = {
  default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  memorable: "123456789ABCDEFGHJKLMNPQRSTUVWXYZ",
  filename: "0123456789abcdefghijklmnopqrstuvwxyz",
};

const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generate = (): string => uuidv4();
export const publicId = (): string => customAlphabet(alphabets.default, 10)();

export const shortId = (length = 10): string =>
  customAlphabet(alphabets.default, length)();

export const fileSafeId = (length = 10): string =>
  customAlphabet(alphabets.filename, length)();

export const memorableId = (length: number): string =>
  customAlphabet(alphabets.memorable, length)();

export const isUUID = (id: string) =>
  (
    id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    ) || []
  ).length > 0;
