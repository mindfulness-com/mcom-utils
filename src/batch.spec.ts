import { Deferred } from "ts-deferred";

import { batch } from "./batch";

test("does everything sequentially if no concurrency passed in", async () => {
  const fn = jest.fn(async () => "result");
  expect(await batch(fn, { total: 10 })).toEqual([
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
  ]);
});

test("does in groups on concurrent when passed in", async () => {
  const d1 = new Deferred();
  const d2 = new Deferred();
  const fn = jest.fn(async (g, _total) => {
    return g < 5 ? d1.promise : d2.promise;
  });

  const result = batch(fn, { total: 10, concurrent: 5 });

  expect(fn).toHaveBeenCalledTimes(0);

  // Allow promises to run inside batch
  await new Promise(r => r());
  expect(fn).toHaveBeenCalledTimes(5);

  d1.resolve("result");
  await new Promise(r => setTimeout(r, 100));

  expect(fn).toHaveBeenCalledTimes(10);

  d2.resolve("result-2");
  await new Promise(r => setTimeout(r, 100));

  expect(await result).toEqual([
    "result",
    "result",
    "result",
    "result",
    "result",
    "result-2",
    "result-2",
    "result-2",
    "result-2",
    "result-2",
  ]);
});

test("works when total items less than concurrency size", async () => {
  const fn = jest.fn(async () => "result");

  const result = batch(fn, { total: 10, concurrent: 100 });

  await new Promise(r => r());

  expect(fn).toHaveBeenCalledTimes(10);

  expect(await result).toEqual([
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
    "result",
  ]);
});

test("works when total items less than concurrency size 2", async () => {
  const fn = jest.fn(async () => "result");

  const result = batch(fn, { total: 5, concurrent: 3 });

  await new Promise(r => setTimeout(r, 100));

  expect(fn).toHaveBeenCalledTimes(5);

  expect(await result).toEqual([
    "result",
    "result",
    "result",
    "result",
    "result",
  ]);
});
