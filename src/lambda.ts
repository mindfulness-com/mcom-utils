import * as AWS from "aws-sdk";
import { debug } from "./debug";
import { getEnvVar, getInfraSuffix, isLocalInfraEnv } from "./env";

const lambda = new AWS.Lambda({
  region: "us-east-1",
  accessKeyId: getEnvVar("AWS_ACCESS_KEY"),
  secretAccessKey: getEnvVar("AWS_SECRET_KEY"),
});

export const invokeFunction = async (
  name: string,
  args: Record<string, string>,
) => {
  if (isLocalInfraEnv()) {
    debug(
      `Skipping lambda function invocation: ${name} ${JSON.stringify(args)}`,
    );
    return;
  }

  const response = await lambda
    .invoke({
      FunctionName: `mcom${getInfraSuffix()}-${name}`,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify(args),
    })
    .promise();

  if (response.FunctionError) {
    throw new Error(
      response.Payload
        ? JSON.stringify(response.Payload)
        : response.FunctionError,
    );
  }

  return response;
};
