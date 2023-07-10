export const isBetween = (num: number, [from, to]: [number, number]) =>
  num <= to && num >= from;
