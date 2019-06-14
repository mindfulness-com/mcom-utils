declare module "to-time" {
  export interface Time {
    seconds: () => number;
  }
  var toTime: (input: string) => Time;
  export = toTime;
}
