import { omitEmpty } from "./object";

export interface ResizeOptions {
  width: number;
  height?: number;
  fit?: ResizeFit;
  position?: ResizePosition;
}

export enum ResizeFit {
  Cover = "COVER",
  Contain = "CONTAIN",
  Fill = "FILL",
}

export enum ResizePosition {
  Center = "CENTER",
  Top = "TOP",
  RightTop = "RIGHT_TOP",
  Right = "RIGHT",
  RightBottom = "RIGHT_BOTTOM",
  Bottom = "BOTTOM",
  LeftBottom = "LEFT_BOTTOM",
  Left = "LEFT",
  LeftTop = "LEFT_TOP",
}

const toSharpFit = (fit: ResizeFit) => fit.toLowerCase();
const toSharpPosition = (position: ResizePosition) =>
  position
    .toLowerCase()
    .replace("top", "north")
    .replace("left", "west")
    .replace("bottom", "south")
    .replace("right", "east")
    .replace("_", "");

export const stringifyOptions = (opts: ResizeOptions) => {
  const willScale = !!opts.height && !!opts.width;

  // Only default fit and position if both height and width are set
  const defaults = willScale
    ? { fit: ResizeFit.Cover, position: ResizePosition.Center }
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

export const resizedUrl = (url: string, options: ResizeOptions) =>
  url.replace(/\.([a-zA-Z0-9]+)$/, `.${stringifyOptions(options)}.$1`);

export const resizedOrOriginal = (url: string, options?: ResizeOptions) =>
  options ? resizedUrl(url, options) : url;
