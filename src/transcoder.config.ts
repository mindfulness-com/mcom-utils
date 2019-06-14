import { Outputs } from "./transcoder";

export const audioConfig = {
  getOutputs: (): Outputs => ({
    mp4: `index.mp4`,
  }),
  generate: (input: string, output: string) => ({
    Settings: {
      OutputGroups: [
        {
          CustomName: "audio",
          OutputGroupSettings: {
            Type: "FILE_GROUP_SETTINGS",
            FileGroupSettings: {
              Destination: `${output}/index`,
            },
          },
        },
      ],
      Inputs: [
        {
          FileInput: `${input}`,
        },
      ],
    },
  }),
};

export const videoConfig = {
  getOutputs: (): Outputs => ({
    hls: `index.m3u8`,
    poster: `frame_poster.0000000.jpg`,
    frame0: `frame_initial.0000000.jpg`,
  }),
  generate: (input: string, output: string) => ({
    Settings: {
      OutputGroups: [
        {
          CustomName: "hls",
          OutputGroupSettings: {
            Type: "HLS_GROUP_SETTINGS",
            HlsGroupSettings: {
              Destination: `${output}/index`,
            },
          },
        },
        {
          CustomName: "frames",
          OutputGroupSettings: {
            Type: "FILE_GROUP_SETTINGS",
            FileGroupSettings: {
              Destination: `${output}/frame`,
            },
          },
        },
      ],
      Inputs: [
        {
          FileInput: `${input}`,
        },
      ],
    },
  }),
};
