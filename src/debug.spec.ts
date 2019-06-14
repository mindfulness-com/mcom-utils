const mocks = {
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
};
jest.mock("@sentry/node", () => mocks);
jest.mock("./env");

import { values } from "lodash";
import { log } from "./debug";

beforeEach(() => {
  values(mocks).map(m => m.mockClear());
});

test("logs errors as exceptions", () => {
  const err = new Error("blahs");

  log(err);

  expect(mocks.captureException).toHaveBeenCalledTimes(1);
  expect(mocks.captureException).toHaveBeenCalledWith(err);
  expect(mocks.captureMessage).not.toHaveBeenCalled();
});

class CustomError extends Error {
  constructor(input: string) {
    super(input);
  }
}
test("logs custom errors as exceptions", () => {
  const err = new CustomError("blahs");

  log(err);

  expect(mocks.captureException).toHaveBeenCalledTimes(1);
  expect(mocks.captureException).toHaveBeenCalledWith(err);
  expect(mocks.captureMessage).not.toHaveBeenCalled();
});

test("logs strings as messages", () => {
  const message = "yooz";

  log(message);

  expect(mocks.captureMessage).toHaveBeenCalledTimes(1);
  expect(mocks.captureMessage).toHaveBeenCalledWith(message);
  expect(mocks.captureException).not.toHaveBeenCalled();
});
