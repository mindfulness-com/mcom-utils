export declare const batch: <T>(fn: (group: number, total: number) => Promise<T>, opts: {
    total: number;
    concurrent?: number;
}) => Promise<T[]>;
export declare const paginate: <T>(fn: (page: number, size: number, total: number) => Promise<T>, opts: {
    total: number;
    size: number;
    concurrent?: number;
}) => Promise<T[]>;
export declare const batchMap: <T, R>(fn: (item: T, index: number, total: number) => Promise<R>, opts: {
    items: T[];
    concurrent?: number;
}) => Promise<R[]>;
