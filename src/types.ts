export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Primitive = string | number | Date | boolean | undefined | null;
export type PrimitiveRecord = Record<string, Primitive>;
