import { pluckUnique, indexBy } from "./array";

test("plucks values provided from the predicate", () => {
  interface Thing {
    a: Maybe<string>;
  }
  const values: Thing[] = [
    { a: "one" },
    { a: "two" },
    { a: "" },
    { a: undefined },
    { a: "one" },
  ];
  const plucker = pluckUnique<Thing>(thing => thing.a);
  expect(plucker(values)).toEqual(["one", "two", ""]);
});

test("can create an index", () => {
  const tests = [
    { id: "a" },
    { id: "b" },
    { id: "c" },
    { id: "a" },
    { id: undefined },
  ];
  expect(indexBy(tests, t => t.id)).toEqual({
    a: tests[3],
    b: tests[1],
    c: tests[2],
  });
});
