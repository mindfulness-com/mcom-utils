import { series, src, dest } from "gulp";
import * as replace from "gulp-replace";
import * as childProcess from "child_process";
import { snakeCase } from "change-case";

const exec = (command: string): Promise<never> => {
  return new Promise((resolve, reject) => {
    const process = childProcess.exec(command, (err, stdOut, stdErr) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
    process.stdout.on("data", console.log);
  });
};

/* Building */

const copyGraphQl = () => src("./src/**/*.gql").pipe(dest("./dist/src"));
const copyFolders = () =>
  src("./{.ebextensions,db-ops}/**/*").pipe(dest("./dist"));
const copyFiles = () =>
  src(["package-lock.json", ".npmrc", ".sequelizerc"]).pipe(dest("./dist"));

const copyPackage = () =>
  src("./package.json")
    .pipe(replace("/dist", ""))
    .pipe(replace("ts-node --files", "node"))
    .pipe(replace("npm run build:migrations && ", ""))
    .pipe(dest("./dist"));

const copy = series(copyGraphQl, copyFolders, copyFiles, copyPackage);

const compile = () => exec("npx tsc");

/* AWS Environment Variables */

const infraEnv = () => {
  switch (process.env.CIRCLE_BRANCH || process.env.INFRA_ENV) {
    case "master":
    case "prod":
    case "production":
      return "prod";

    case "uat":
    case "staging":
    // TODO: When prod environment is setup
    // return "stag";

    case "dev":
    case "local":
    case "develop":
    case "development":
    default:
      return "dev";
  }
};

const fetchPEM = (name: string) =>
  exec(`aws s3api get-object \
    --bucket mcom-terraform-creds \
    --key certs/${name}.pem \
    ./dist/certs/${name}.pem`);

const fetchVar = (ssmKey: string) =>
  exec(`echo ${snakeCase(ssmKey).toUpperCase()}=$(
    aws ssm get-parameter \
      --name "/${infraEnv()}/env/${ssmKey}" \
      --with-decryption \
      --query Parameter.Value \
      --output text
  ) >> ./dist/.env`);

export const fetchVars = async () => {
  await exec(`
    mkdir -p dist/certs;
    rm -f dist/.env;
    touch dist/.env;
  `);

  await Promise.all([
    // API env vars from SSM
    exec(`aws ssm get-parameter \
      --name "/${infraEnv()}/api/env-vars" \
      --with-decryption \
      --query Parameter.Value \
      --output text \
      >> ./dist/.env \
    `),
    fetchVar("segment-api-key"),
    // RDS SSL Cert
    fetchPEM("rds-ca-cert"),
    // AWS Cloudflare Secret Key
    fetchPEM("aws-cf-secret-key"),
    // Session encryption keys
    fetchPEM("session-key-private"),
    fetchPEM("session-key-public"),
  ]);
};

export const migrateRemoteDb = async () => {
  const INFRA_ENV = infraEnv();
  await exec(`cp dist/.env .env`);
  await exec(`cp -rf dist/certs certs/`);
  await exec(`echo DB_CONNECTION=$(
    aws ssm get-parameter \
      --name "/${INFRA_ENV}/database/master-connection-string" \
      --with-decryption \
      --query Parameter.Value \
      --output text
  ) >> .env`);
  await exec(`INFRA_ENV=${INFRA_ENV} npm run db:sync`);
};

export const codegen = () => exec("npm run codegen");

export const pushToEB = () => exec(`eb deploy mcom-${infraEnv()}-api --staged`);

export const clean = () => exec("rm -rf dist");
export const zip = () => exec("cd ./dist; zip -r ./bundle.zip .");
export const build = series(clean, codegen, compile, fetchVars, copy, zip);
export const deploy = series(build, pushToEB, clean);
