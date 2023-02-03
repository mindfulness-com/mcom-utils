import { Maybe } from "./maybe";
export interface Cue {
    id?: Maybe<string>;
    timeStart: string;
    timeEnd: string;
    settings: Record<string, Maybe<string>>;
    text: string;
}
export declare const parseWebVTT: (raw: string) => Cue[];
