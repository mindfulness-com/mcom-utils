import { Deferred } from "ts-deferred";

import { batch, batchMap, paginate } from "./batch";

describe("batch", () => {
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
});

describe("paginate", () => {
  test("breaks down page sizes correctly", async () => {
    const fn = jest.fn(async (page, size) => [page, size]);

    expect(await paginate(fn, { total: 10, size: 2 })).toEqual([
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ]);

    expect(fn).toHaveBeenCalledTimes(5);
  });

  test("breaks down uneven page sizes correctly", async () => {
    const fn = jest.fn(async (page, size) => [page, size]);

    expect(await paginate(fn, { total: 11, size: 2 })).toEqual([
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
    ]);

    expect(fn).toHaveBeenCalledTimes(6);
  });
});

describe("batchMap", () => {
  test("normal map when no concurrency", async () => {
    const fn = jest.fn(async (item, index) => `${item}-${index}`);

    const result = await batchMap(fn, {
      items: [1, 2, 3, 4, 5],
      concurrent: 1,
    });

    expect(fn).toHaveBeenCalledTimes(5);

    expect(result).toEqual(["1-0", "2-1", "3-2", "4-3", "5-4"]);
  });

  test("calls all concurrently", async () => {
    const fn = jest.fn(async (item, index) => `${item}-${index}`);

    const result = await batchMap(fn, {
      items: [1, 2, 3, 4, 5],
      concurrent: 2,
    });

    expect(fn).toHaveBeenCalledTimes(5);

    expect(result).toEqual(["1-0", "2-1", "3-2", "4-3", "5-4"]);
  });

  test("waits for all batches to complete", async () => {
    const d1 = new Deferred();
    const d2 = new Deferred();
    const fn = jest.fn(async (g, _total) => {
      return g < 3 ? d1.promise.then(() => g) : d2.promise.then(() => g);
    });

    const result = batchMap(fn, {
      items: [1, 2, 3, 4, 5],
      concurrent: 2,
    });

    // Allow promises to run inside batch
    await new Promise(r => r());
    expect(fn).toHaveBeenCalledTimes(2);

    d1.resolve("result");
    await new Promise(r => setTimeout(r, 100));

    expect(fn).toHaveBeenCalledTimes(4);

    d2.resolve("result-2");
    await new Promise(r => setTimeout(r, 100));

    expect(fn).toHaveBeenCalledTimes(5);

    expect(await result).toEqual([1, 2, 3, 4, 5]);
  });
});
