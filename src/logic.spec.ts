import { ifDo, switchEnum } from "./logic";

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

describe("switchEnum", () => {
  type TestEnum = "foo" | "bar" | "car";

  test("calls the correct func", () => {
    expect(
      switchEnum("foo" as TestEnum, {
        foo: () => "is-foo",
        bar: () => "is-bar",
        car: () => "is-car",
        else: () => "is-else",
      }),
    ).toBe("is-foo");

    expect(
      switchEnum("bar" as TestEnum, {
        foo: () => "is-foo",
        bar: () => "is-bar",
        car: () => "is-car",
        else: () => "is-else",
      }),
    ).toBe("is-bar");
  });

  test("fallsback to else", () => {
    expect(
      switchEnum("fooootballl" as TestEnum, {
        foo: () => "is-foo",
        bar: () => "is-bar",
        car: () => "is-car",
        else: () => "is-else",
      }),
    ).toBe("is-else");
  });

  test("supports vars instead of fns", () => {
    expect(
      switchEnum("foo" as TestEnum, {
        foo: "is-foo",
        bar: "is-bar",
        car: "is-car",
        else: "is-else",
      }),
    ).toBe("is-foo");

    expect(
      switchEnum("fooootballl" as TestEnum, {
        foo: "is-foo",
        bar: "is-bar",
        car: "is-car",
        else: "is-else",
      }),
    ).toBe("is-else");
  });
});
