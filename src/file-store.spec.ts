const mocks = {
  signCloudfrontUrl: jest.fn(),
  signS3BucketKey: jest.fn(),
};

jest.mock("./env");
jest.mock("aws-sdk", () => ({
  CloudFront: {
    Signer: jest.fn(() => ({
      getSignedUrl: mocks.signCloudfrontUrl,
    })),
  },
  S3: jest.fn(() => ({
    getSignedUrl: mocks.signS3BucketKey,
    deleteObject: jest.fn(() => ({
      promise: jest.fn(),
    })),
    deleteObjects: jest.fn(() => ({
      promise: jest.fn(),
    })),
    listObjects: jest.fn(() => ({
      promise: jest.fn(() => ({
        Contents: [],
      })),
    })),
  })),
}));

import { mockEnvVar } from "./env.mock";
import { skipOnProdInfraEnv } from "./env";
import {
  deleteDirectory,
  deleteFile,
  signUrl,
  constructS3Uri,
  deconstructS3Uri,
} from "./file-store";

afterEach(() => {
  (skipOnProdInfraEnv as jest.Mock).mockClear();
});

test("can only delete directories in development", async () => {
  await deleteDirectory("any", "any");
  expect(skipOnProdInfraEnv).toHaveBeenCalledTimes(1);
});

test("constructs s3 file uris correctly", async () => {
  expect(constructS3Uri("bucket", "path/to/file.boss")).toBe(
    "s3://bucket/path/to/file.boss",
  );
});

test("deconstructs s3 file uris correctly", async () => {
  expect(deconstructS3Uri("s3://bucket/path/to/file.boss")).toEqual({
    protocol: "s3:",
    bucket: "bucket",
    path: "path/to/file.boss",
  });
});

test("signs media files with cloudfront", () => {
  const restoreVar = mockEnvVar("MEDIA_DOMAIN", "media.test.com");

  mocks.signCloudfrontUrl.mockImplementation(opts => `${opts.url}?signed=true`);
  expect(signUrl("s3://mcom-test-media/path/to/file").url).toBe(
    "https://media.test.com/path/to/file?signed=true",
  );

  restoreVar();
});

test("can only delete files in development", async () => {
  await deleteFile("any", "any");
  expect(skipOnProdInfraEnv).toHaveBeenCalledTimes(1);
});
