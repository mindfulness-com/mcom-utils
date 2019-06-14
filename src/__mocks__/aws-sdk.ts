/* eslint-disable @typescript-eslint/no-explicit-any */
const promisable = (result: any) => () => ({
  promise: jest.fn().mockImplementation(async () => result),
});

export const MediaConvert = jest.fn(() => ({
  createJob: jest.fn(promisable({})),
}));

export const CloudFront = {
  Signer: jest.fn(() => ({
    getSignedUrl: jest.fn(),
  })),
};

export const Lambda = jest.fn(() => ({
  invokeFunction: jest.fn(promisable({})),
}));

export const S3 = jest.fn(() => ({
  getSignedUrl: jest.fn(),
  listObjects: jest.fn(promisable({})),
  deleteObjects: jest.fn(promisable({})),
  deleteObject: jest.fn(promisable({})),
}));
