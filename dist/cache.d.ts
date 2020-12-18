export declare const cachedFunc: <R, F extends (...args: any) => R>(func: F, milliseconds: number, normalizer?: ((args: Parameters<F>) => string) | undefined) => F;
