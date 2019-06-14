import { Model } from "sequelize-typescript";
import { Query } from "./query";
import { mockRepo } from "../db/__mocks__/index";

class Test extends Model<Test> {
  a: string;
  b: boolean;
}

const repo = mockRepo();

beforeEach(() => {
  (repo.findOne as jest.Mock).mockClear();
  (repo.findByPk as jest.Mock).mockClear();
  (repo.findAll as jest.Mock).mockClear();
});

test("can search the repo", async () => {
  const query = new Query<Test>(repo);
  await query.findAll();
  expect(repo.findAll).toHaveBeenCalledTimes(1);
});

test("throws error when not found", async () => {
  const query = new Query<Test>(repo);
  let errors = 0;

  try {
    await query.findOne();
  } catch (err) {
    expect(err).toBeDefined();
    errors += 1;
  }
  expect(errors).toBe(1);
  expect(repo.findOne).toHaveBeenCalledTimes(1);

  const foo = {};
  (repo.findOne as jest.Mock).mockReturnValue(foo);
  const result = await query.findOne();
  expect(result).toBe(foo);
  expect(errors).toBe(1);
  expect(repo.findOne).toHaveBeenCalledTimes(2);
});

test("merges where clauses", () => {
  const query = new Query<Test>(repo);
  query.where({
    a: "true",
  });
  query.where({
    b: true,
  });
  expect(query.options).toEqual({
    where: {
      a: "true",
      b: true,
    },
  });
});

test("concats includes", () => {
  const query = new Query<Test>(repo);
  query.include({
    as: "blah",
  });
  query.include({
    as: "foo",
  });
  expect(query.options.include).toEqual([{ as: "blah" }, { as: "foo" }]);
});

test("join where with includes", () => {
  const query = new Query<Test>(repo);
  query.where({
    a: "true",
  });
  query.include({
    as: "blah",
  });
  expect(query.options).toEqual({
    where: { a: "true" },
    include: [{ as: "blah" }],
  });
});

test("can specify sortBy on includes", () => {
  const query = new Query<Test>(repo);
  query.include({
    as: "blah",
    sortBy: { pizza: "ASCENDING" },
  });
  expect(query.options.order).toEqual([["blah", "pizza", "ASC"]]);
});
