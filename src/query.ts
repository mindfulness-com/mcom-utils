import { IFindOptions, Model, IIncludeOptions } from "sequelize-typescript";
import { Op, literal } from "sequelize";
import { map, toPairs } from "lodash";

import { ModelRepository } from "../db/types";
import { NotFound } from "./error";
import { log } from "./debug";
import { RequestContext } from "../app/types";
import { createPage, PageResults } from "./pagination";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Options = Record<string, any>;

type SortDirection = "ASCENDING" | "DESCENDING";

interface SortByOptions {
  [key: string]: SortDirection;
}

interface IncludeOptions extends IIncludeOptions {
  sortBy?: SortByOptions;
}

export { IIncludeOptions } from "sequelize-typescript";

export class Query<T extends Model<T>> {
  options: IFindOptions<T>;
  model: ModelRepository<T>;
  constructor(model: ModelRepository<T>) {
    this.options = {};
    this.model = model;
    return this;
  }

  includes(includes: IncludeOptions[]) {
    this.options = {
      ...this.options,
      include: [...(this.options.include || []), ...includes],
    };

    // Sequelize can't sort on includes.
    // Pass sub-query sorts up to parent sort with relation prefixes.
    const includeSort: SortByOptions = {};
    includes.forEach(include => {
      if (include.sortBy && include.as) {
        toPairs(include.sortBy).map(([key, sort]: [string, SortDirection]) => {
          includeSort[`${include.as}.${key}`] = sort;
        });
      }
      if (include.sortBy && !include.as) {
        throw new Error(
          "When sorting by related entity, you must specify the 'as' field.",
        );
      }
    });

    return this.sortBy(includeSort);
  }

  include(include: IncludeOptions) {
    this.includes([include]);
    return this;
  }

  where(where?: IFindOptions<T>["where"]) {
    this.options = {
      ...this.options,
      where: {
        ...(this.options.where || {}),
        ...where,
      },
    };
    return this;
  }

  and(query: IFindOptions<T>["where"]) {
    this.options = {
      ...this.options,
      where: {
        ...(this.options.where || {}),
        [Op.and]: [query],
      },
    };
    return this;
  }

  includeDeleted(include: boolean = true) {
    this.options.paranoid = !include;
    return this;
  }

  scope(scope: string, params: any[]) {
    this.model = this.model.scope({ method: [scope, ...params] });
    return this;
  }

  useContext(context: RequestContext) {
    if (context.session) {
      try {
        // Try scope by role
        this.scope(context.session.role, [context.session]);
      } catch (err) {
        // Fallback to default scope if scope doesn't exist
      }
    }
    return this;
  }

  limit(limit?: IFindOptions<T>["limit"]) {
    this.options.limit = limit;
    return this;
  }

  offset(offset?: IFindOptions<T>["offset"]) {
    this.options.offset = offset;
    return this;
  }

  paginate(page?: { take: number; skip: number }) {
    if (page) {
      this.limit(page.take);
      this.offset(page.skip);
    }
    return this;
  }

  sort(sort?: IFindOptions<T>["order"]) {
    this.options.order = sort;
    return this;
  }

  sortBy(sort: SortByOptions) {
    const sortOrders = map(sort, (direction, field) => [
      ...field.split("."),
      direction === "ASCENDING" ? "ASC" : "DESC",
    ]);
    if (sortOrders.length) {
      this.sort(sortOrders);
    }
    return this;
  }

  log() {
    this.options = { ...this.options, logging: console.log };
    log(JSON.stringify(this.options));
    return this;
  }

  async findAll(): Promise<T[]> {
    return await this.model.findAll(this.options);
  }
  async findPage(page: {
    take: number;
    skip: number;
  }): Promise<PageResults<T>> {
    this.paginate(page);
    const { rows, count } = await this.model.findAndCountAll(this.options);
    return createPage(rows, page, count);
  }
  async findOne(): Promise<T> {
    const result = await this.model.findOne(this.options);
    if (!result) {
      throw new NotFound("Not found.");
    }
    return result;
  }
  async find(): Promise<Maybe<T>> {
    return await this.model.findOne(this.options);
  }
  async findById(id: string): Promise<T> {
    const result = await this.model.findByPk(id, this.options);
    if (!result) {
      throw new NotFound(`Cound not find entity for id: ${id}`);
    }
    return result;
  }

  static containsAll = (vals: string[]): Options => ({ [Op.contains]: vals });
  static containsAny = (vals: string[]): Options => ({ [Op.overlap]: vals });
  static in = (vals: string[]): Options => ({ [Op.in]: vals });
  static or = (vals: Options[]): Options => ({ [Op.or]: vals });
  static and = (vals: Options[]): Options => ({ [Op.and]: vals });
  static not = (val: string | Date | number): Options => ({ [Op.ne]: val });
  static greaterThan = (val: string | Date | number): Options => ({
    [Op.gt]: val,
  });
  static lessThan = (val: string | Date | number): Options => ({
    [Op.lt]: val,
  });
  static lessThanOrEqual = (val: string | Date | number): Options => ({
    [Op.lte]: val,
  });
  static literal = (val: string): literal => literal(val);
  static like = (val: string): Options => ({ [Op.like]: val });
}
