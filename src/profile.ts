import * as microseconds from "microseconds";

export const profile = <T>(doWork: () => T, ...rest: string[]): T => {
  const n = microseconds.now();
  const r = doWork();
  console.log(microseconds.since(n), ...(rest || ["time"]));
  return r;
};
