import * as AWS from "aws-sdk";
import { addSeconds } from "date-fns";
import { first } from "lodash";

import { toSeconds } from "./time";
import {
  getEnvVar,
  skipOnProdInfraEnv,
  getEnvPEM,
  getInfraSuffix,
} from "./env";
import { toUnix } from "./date";

let c: AWS.CloudFront.Signer;
const cloudfront = () => {
  if (!c) {
    c = new AWS.CloudFront.Signer(
      getEnvVar("AWS_CF_ACCESS_KEY"),
      getEnvPEM("AWS_CF_SECRET_KEY"),
    );
  }
  return c;
};

let s: AWS.S3;
const s3 = () => {
  if (!s) {
    s = new AWS.S3({
      accessKeyId: getEnvVar("AWS_ACCESS_KEY"),
      secretAccessKey: getEnvVar("AWS_SECRET_KEY"),
    });
  }
  return s;
};

export const ExpiryWindow = {
  UPLOAD: toSeconds("3 hours"),
  SENSITIVE: toSeconds("3 hours"),
  NORMAL: toSeconds("6 hours"),
  NEVER: toSeconds("10 years"),
};

export interface SignedUrl {
  url: string;
  expiresAt: Date;
  originalUrl: string;
}

export const deconstructS3Uri = (s3FileUri: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [protocol, _empty, bucket, ...paths] = s3FileUri.split("/");
  if (protocol !== "s3:") {
    throw new Error(`Invalid s3 file uri: ${s3FileUri}`);
  }
  return {
    protocol,
    bucket,
    path: paths.join("/"),
  };
};

export const constructS3Uri = (bucket: string, ...paths: string[]): string =>
  `s3://${bucket}/${paths.join("/")}`;

export const deleteDirectory = async (
  bucket: string,
  directory: string,
): Promise<void> =>
  skipOnProdInfraEnv(async () => {
    const response = await s3()
      .listObjects({
        Bucket: bucket,
        Prefix: directory,
      })
      .promise();

    // Only try delete if there are files
    if (response.Contents && response.Contents.length) {
      await s3()
        .deleteObjects({
          Bucket: bucket,
          Delete: {
            Objects: response.Contents.map(c => ({ Key: c.Key || "" })),
          },
        })
        .promise();
    }
  });

export const deleteFile = async (bucket: string, path: string): Promise<void> =>
  skipOnProdInfraEnv(async () => {
    await s3()
      .deleteObject({
        Bucket: bucket,
        Key: path,
      })
      .promise();
  });

const signedCloudFrontAccess = (domain: string, key: string, expiry: number) =>
  cloudfront().getSignedUrl({
    url: `https://${domain}/${key}`,
    expires: toUnix(addSeconds(new Date(), expiry)), // Unix timestamp
  });

const signedS3Access = (bucket: string, key: string, expiryWindow: number) =>
  s3().getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: expiryWindow,
  });

export const getMediaBucket = () => `mcom${getInfraSuffix()}-media`;

export const getSignedUploadUrl = (
  bucket: string,
  key: string,
  type: string,
): SignedUrl => {
  const expiryWindow = ExpiryWindow.UPLOAD;
  const url = s3().getSignedUrl("putObject", {
    Bucket: bucket,
    Key: key,
    ContentType: type,
    Expires: expiryWindow,
    ACL: "private",
  });

  return {
    url,
    expiresAt: addSeconds(new Date(), expiryWindow),
    originalUrl: "",
  };
};

export const getSignedUrl = (
  bucket: string,
  key: string,
  expireInSeconds?: number,
): SignedUrl => {
  const expiryWindow = expireInSeconds || ExpiryWindow.NORMAL;
  const signed =
    bucket === getMediaBucket()
      ? signedCloudFrontAccess(getEnvVar("MEDIA_DOMAIN"), key, expiryWindow)
      : signedS3Access(bucket, key, expiryWindow);

  return {
    url: signed,
    expiresAt: addSeconds(new Date(), expiryWindow),
    originalUrl: first(signed.split("?")) || "",
  };
};

export const getSignedUrlForPaths = (
  bucket: string,
  paths: string[],
  expireInSeconds?: number,
): SignedUrl =>
  getSignedUrl(
    bucket,
    paths.filter(p => Boolean(p)).join("/"),
    expireInSeconds,
  );

export const signUrl = (url: string, expireInSeconds?: number): SignedUrl => {
  const [protocol, uri] = url.split("://");

  if (!(uri && protocol) || protocol !== "s3") {
    throw new Error(`Unknown media uri: ${url}`);
  }

  const [bucket, ...paths] = uri.split("/");

  return getSignedUrlForPaths(bucket, paths, expireInSeconds);
};
