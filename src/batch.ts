import { times, reduce } from "lodash";
import { ifDo } from "./logic";
import { definetly } from "./definetly";

export const batch = async <T>(
  fn: (group: number, total: number) => Promise<T>,
  opts: { total: number; concurrent?: number },
): Promise<T[]> => {
  const total = opts.total;
  const concurrent = opts.concurrent || 1;

  const batches = Math.ceil(total / concurrent);

  return reduce(
    times(batches, n => n),
    async (acc, batch) => {
      // First wait for previous batch to finish
      const prev = await acc;
      const skip = batch * concurrent;

      return [
        ...prev,
        // Then complete your batch of jobs
        ...(await Promise.all(
          times(
            ifDo(batch === batches - 1, () => total % concurrent) || concurrent,
            cur => fn(skip + cur, total) as Promise<T>,
          ),
        )),
      ];
    },
    Promise.resolve([]) as Promise<T[]>,
  );
};

export const paginate = async <T>(
  fn: (page: number, size: number, total: number) => Promise<T>,
  opts: { total: number; size: number; concurrent?: number },
): Promise<T[]> => {
  const concurrent = opts.concurrent || 1;
  const pages = Math.ceil(opts.total / opts.size) || 1;

  return await batch((page, total) => fn(page, opts.size, total), {
    total: pages,
    concurrent,
  });
};

export const batchMap = async <T, R>(
  fn: (item: T, index: number, total: number) => Promise<R>,
  opts: { items: T[]; concurrent?: number },
): Promise<R[]> =>
  batch(
    async g => {
      const item = definetly(opts.items[g], "Batch error on index.");
      return fn(item, g, opts.items.length);
    },
    {
      total: opts.items.length,
      concurrent: opts.concurrent,
    },
  );
