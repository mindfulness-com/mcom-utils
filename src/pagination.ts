import * as Graph from "../types/graph-schema";

export interface PageResults<T> {
  page: Graph.PageInfo;
  items: T[];
}

export const defaultPage = (page?: Graph.PageInput): Graph.PageInput =>
  page || { skip: 0, take: 1000 };

export const createPage = <T>(
  results: T[],
  page: Graph.PageInput,
  total: number,
): PageResults<T> => ({
  items: results,
  page: {
    skip: page.skip,
    take: page.take,
    total: total,
    more: total > page.skip + page.take,
  },
});

export const paginate = <T>(items: T[]): PageResults<T> => ({
  items,
  page: {
    // TODO: Hook up proper pagination
    skip: 0,
    take: items.length,
    more: false,
    total: items.length,
  },
});
