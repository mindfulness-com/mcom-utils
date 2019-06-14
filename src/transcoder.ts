import { writeFileSync } from "fs";
import * as AWS from "aws-sdk";

import { fileSafeId } from "./id";
import { InvalidArgs } from "./error";
import { take } from "lodash";
import { getEnvVar, onlyInLocalEnv } from "./env";
import { audioConfig, videoConfig } from "./transcoder.config";

export { Job } from "aws-sdk/clients/mediaconvert";

export interface Outputs {
  hls?: string;
  mp4?: string;
  frame0?: string;
  poster?: string;
}

export enum JobStatus {
  Submitted = "SUBMITTED",
  Progressing = "PROGRESSING",
  Complete = "COMPLETE",
  Canceled = "CANCELED",
  Error = "ERROR",
}

let m: AWS.MediaConvert;
const mediaConvert = () => {
  if (!m) {
    m = new AWS.MediaConvert({
      region: "us-east-1",
      endpoint: getEnvVar("AWS_MEDIA_CONVERT_ENDPOINT"),
      accessKeyId: getEnvVar("AWS_ACCESS_KEY"),
      secretAccessKey: getEnvVar("AWS_SECRET_KEY"),
    });
  }
  return m;
};

const getDirectory = (s3Uri: string): string => {
  const parts = s3Uri.split("/");
  return take(parts, parts.length - 1).join("/");
};

export const syncTemplate = async (template: string) =>
  onlyInLocalEnv(async () => {
    const { JobTemplate } = await mediaConvert()
      .getJobTemplate({ Name: template })
      .promise();

    writeFileSync(
      `${__dirname}/transcoder.${template}.json`,
      JSON.stringify(JobTemplate),
    );

    return JobTemplate;
  });

export const createJob = async (inputS3Uri: string, template: string) => {
  const isAudio = template === "audio";
  const config = isAudio ? audioConfig : videoConfig;
  const subDirectoryName = fileSafeId(4);
  const outputDirectoryUri = `${getDirectory(inputS3Uri)}/${subDirectoryName}`;

  const { Job } = await mediaConvert()
    .createJob({
      Role: getEnvVar("AWS_MEDIA_CONVERT_ROLE"),
      JobTemplate: template,
      ...config.generate(inputS3Uri, outputDirectoryUri),
    })
    .promise();

  if (!Job) {
    throw new Error("Failed to create conversion job.");
  }

  if (Job.ErrorMessage || Job.Status === "ERROR") {
    throw new Error(Job.ErrorMessage);
  }

  return {
    id: Job.Id,
    job: Job,
    status: (Job.Status as JobStatus) || "ERROR",
    directory: subDirectoryName,
    outputs: config.getOutputs(),
  };
};

export const getJobStatus = async (jobId: string): Promise<JobStatus> => {
  const { Job } = await mediaConvert()
    .getJob({ Id: jobId })
    .promise();
  if (!Job) {
    throw new InvalidArgs(`Invalid job id: ${jobId}`);
  }

  const status = Job.Status as JobStatus;
  if (!status) {
    throw new Error("Job status is unknown.");
  }

  return status;
};
