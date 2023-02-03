import { first, fromPairs, map, reduce } from "lodash";
import { split } from "lodash/fp";

import { fallback, using } from "./fn";
import { ifDo_ } from "./logic";
import { switchEnum } from "./logic";
import { Maybe } from "./maybe";

export interface Cue {
  id?: Maybe<string>;
  timeStart: string;
  timeEnd: string;
  settings: Record<string, Maybe<string>>;
  text: string[];
}

const seperateParts = (raw: string) => raw.split(/\n\n/gi);

const partType = (raw: string) =>
  using([first(raw.split("\n"))], firstLine =>
    fallback(
      ifDo_(firstLine?.startsWith("WEBVTT"), () => "HEAD"),
      ifDo_(firstLine?.startsWith("NOTE"), () => "NOTE"),
      () => "CUE",
    ),
  );

const parseCue = (raw: string) => {
  const [first, second, ...rest] = raw.split(/\n/);
  const hasID = first.includes("-->");
  const timing = hasID ? first : second;
  const id = !hasID ? first : undefined;

  const [timeStart, _arrow, timeEnd, ...settings] = timing.split(" ");

  return {
    id,
    timeStart,
    timeEnd,
    settings: fromPairs(map(settings, split(":"))),
    text: map(rest, l => l.replace(/^- /gi, "")),
  };
};

export const parseWebVTT = (raw: string): Cue[] =>
  reduce(
    seperateParts(raw),
    (r, p) =>
      switchEnum(partType(p), {
        CUE: () => [...r, parseCue(p)],
        // NOTE: () => r, // Not supported atm
        // HEAD: () => r, // Not supported atm
        else: () => r,
      }),
    [] as Cue[],
  );
