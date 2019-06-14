export const not = <T>(func: (arg: T) => boolean) => (arg: T) => !func(arg);
