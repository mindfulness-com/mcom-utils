import * as Graph from "../types/graph-schema";
import { omitEmpty } from "./object";

const toSharpFit = (fit: Graph.ResizeFit) => fit.toLowerCase();
const toSharpPosition = (position: Graph.ResizePosition) =>
  position
    .toLowerCase()
    .replace("top", "north")
    .replace("left", "west")
    .replace("bottom", "south")
    .replace("right", "east")
    .replace("_", "");

export const stringifyOptions = (opts: Graph.ResizeInput) => {
  const willScale = !!opts.height && !!opts.width;

  // Only default fit and position if both height and width are set
  const defaults = willScale
    ? { fit: Graph.ResizeFit.Cover, position: Graph.ResizePosition.Center }
    : { width: "auto", height: "auto" };

  const final = { ...defaults, ...omitEmpty(opts) };

  return [
    `${final.width}x${final.height || "auto"}`,
    final.fit ? toSharpFit(final.fit) : undefined,
    final.position ? toSharpPosition(final.position) : undefined,
  ]
    .filter(Boolean)
    .join("_");
};

export const resizedUrl = (url: string, options: Graph.ResizeInput) =>
  url.replace(/\.([a-zA-Z0-9]+)$/, `.${stringifyOptions(options)}.$1`);

export const resizedOrOriginal = (url: string, options?: Graph.ResizeInput) =>
  options ? resizedUrl(url, options) : url;
