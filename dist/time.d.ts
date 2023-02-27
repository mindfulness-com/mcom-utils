export declare const toSeconds: (timeOrMins: string | number) => number;
export declare const toMilliSeconds: (time: string) => number;
export declare const toMinutes: (seconds: number) => number;
export * from "./now";
export declare const ensureUTC: () => void;
export declare const formatOffsetInUTC: (offset: number) => string;
export declare const isLessThan: (timeA: Date, timeB: Date) => boolean;
export declare const isGreaterThan: (timeA: Date, timeB: Date) => boolean;
export declare const inFuture: (timeA: Date) => boolean;
export declare const inPast: (timeA: Date) => boolean;
