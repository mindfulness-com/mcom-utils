declare module "microseconds" {
  export const now = () => number;
  export const since = (last: number) => number;
}
