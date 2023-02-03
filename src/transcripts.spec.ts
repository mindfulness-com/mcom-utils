import { parseWebVTT } from "./transcripts";

test("parseWebVTT", () => {
  expect(
    parseWebVTT(`WEBVTT - Translation of that film I like
Kind: captions
Language: en-US
Channel: CC1
Station: Online ABC
ProgramID: SH010855880000
ProgramType: TV series
ProgramName: Castle
Title: Law & Murder
Season: 3
Episode: 19
PublishDate: 2011-03-28
ContentAdvisory: TV-14

NOTE
This translation was done by Kyle so that
some friends can watch it with their parents.

1
00:02:15.000 --> 00:02:20.000 position:10%,line-left align:left size:35%
- Ta en kopp varmt te.
- Det är inte varmt.

2
00:02:20.000 --> 00:02:25.000 position:10%,line-left align:left size:35%
- Har en kopp te.
- Det smakar som te.

NOTE This last line may not translate well.

3
00:02:25.000 --> 00:02:30.000
Ta en kopp`),
  ).toEqual([
    {
      id: "1",
      timeStart: "00:02:15.000",
      timeEnd: "00:02:20.000",
      settings: { position: "10%,line-left", align: "left", size: "35%" },
      text: ["Ta en kopp varmt te.", "Det är inte varmt."],
    },
    {
      id: "2",
      timeStart: "00:02:20.000",
      timeEnd: "00:02:25.000",
      settings: { position: "10%,line-left", align: "left", size: "35%" },
      text: ["Har en kopp te.", "Det smakar som te."],
    },
    {
      id: "3",
      timeStart: "00:02:25.000",
      timeEnd: "00:02:30.000",
      settings: {},
      text: ["Ta en kopp"],
    },
  ]);
});
