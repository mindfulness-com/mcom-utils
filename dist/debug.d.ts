import * as Sentry from "@sentry/node";
export declare const debug: (...messages: any[]) => Maybe<void>;
export declare const log: (message: string | Error | Record<string, any>, extra?: Record<string, any> | undefined) => void;
export { Sentry };
