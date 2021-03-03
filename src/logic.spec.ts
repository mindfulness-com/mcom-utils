import { ifDo } from "./logic";

describe("ifDo", () => {
  test("evaluates on true", () => {
    expect(ifDo(true, () => "yes")).toEqual("yes");
  });

  test("does not evaluate on false", () => {
    expect(ifDo(false, () => "yes")).toBeUndefined();
  });

  test("does not evaluate on undefined", () => {
    expect(ifDo(undefined, () => "yes")).toBeUndefined();
  });

  test("evaluates on true pred", () => {
    expect(
      ifDo(
        () => true,
        () => "yes",
      ),
    ).toEqual("yes");
  });

  test("does not evaluate on false pred", () => {
    expect(
      ifDo(
        () => false,
        () => "yes",
      ),
    ).toBeUndefined();
  });

  test("does not evaluate on undefined pred", () => {
    expect(
      ifDo(
        () => undefined,
        () => "yes",
      ),
    ).toBeUndefined();
  });
});
