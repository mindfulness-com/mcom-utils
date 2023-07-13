import { unless, when } from "./maybe";

test("when", () => {
  expect(when(undefined, () => "failed")).toBeUndefined();
  expect(when(true, () => "passed")).toBe("passed");
  expect(when(false, () => "passed")).toBe("passed");
  expect(when("passed", p => p)).toBe("passed");
});

test("unless", () => {
  expect(unless(undefined, () => "passed")).toBe("passed");
  expect(unless(true, () => "passed")).toBeUndefined();
  expect(unless(false, () => "passed")).toBeUndefined();
});
