declare module "to-time" {
  export interface Time {
    seconds: () => number;
  }
  const toTime: (input: string) => Time;
  export = toTime;
}
