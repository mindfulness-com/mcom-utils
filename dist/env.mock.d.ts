import { Env, InfraEnv } from "./env";
export declare const restoreEnv: () => (() => void);
export declare const mockInfraEnv: (env: InfraEnv | undefined) => (() => void);
export declare const mockEnvVar: (envVar: string, value: string) => (() => void);
export { Env, InfraEnv };
