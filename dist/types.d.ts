export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare type Primitive = string | number | Date | boolean | undefined | null;
export declare type PrimitiveRecord = Record<string, Primitive | Primitive[]>;
