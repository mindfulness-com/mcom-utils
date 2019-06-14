import { isDevelopment, getEnvPEM } from "./env";
import * as jwt from "jsonwebtoken";

const DEV_KEY = "super dooper secret";

const PRIVATE_KEY = isDevelopment()
  ? DEV_KEY
  : getEnvPEM("SESSION_KEY_PRIVATE");
const PUBLIC_KEY = isDevelopment() ? DEV_KEY : getEnvPEM("SESSION_KEY_PUBLIC");

interface JWTOptions {
  issuer: string;
  subject: string;
  audience: string;
  expiresIn: string;
  algorithm: string;
}

const isPEM = (key: string): boolean =>
  key.indexOf("-----BEGIN RSA PRIVATE KEY-----") === 0;

const defaultOptions: Partial<JWTOptions> = {
  issuer: "Mindfulness.com",
  audience: "ios",
  // TODO: Figure out expiry of tokens
  expiresIn: "365d",
  algorithm: isPEM(PRIVATE_KEY) ? "RS256" : "HS256",
};

export const sign = <T extends object>(
  payload: T,
  options?: Partial<JWTOptions>,
): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      PRIVATE_KEY,
      { ...defaultOptions, ...options },
      (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      },
    ),
  );

export const decodeVerified = <T extends object>(
  token: string,
  options?: Partial<JWTOptions>,
): Promise<T> =>
  new Promise(async (resolve, reject) => {
    await jwt.verify(
      token,
      PUBLIC_KEY,
      { ...defaultOptions, ...options },
      (err: Error, decoded: T) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      },
    );
  });
