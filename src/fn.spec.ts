import { wiith, using } from "./fn";

test("should run wiith function using arge generator func", () => {
  const mock = jest.fn();
  wiith(mock, () => ["a", 1]);
  expect(mock).toHaveBeenCalledWith("a", 1);
});

test("should run wiith function using arge generator func", () => {
  const mock = jest.fn();
  using(["a", 1], mock);
  expect(mock).toHaveBeenCalledWith("a", 1);
});
