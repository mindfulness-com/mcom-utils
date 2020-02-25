const mocks = {
  log: jest.fn(),
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  captureEvent: jest.fn(),
};
jest.mock("@sentry/node", () => mocks);
jest.mock("./env");

import { values } from "lodash";
import { log } from "./debug";

const originalLog = console.log;
console.log = mocks.log;

beforeEach(() => {
  values(mocks).map(m => m.mockClear());
});

afterAll(() => {
  console.log = originalLog;
});

test("logs errors as exceptions", () => {
  const err = new Error("blahs");

  log(err);

  expect(mocks.log).toHaveBeenCalledTimes(1);
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

  expect(mocks.captureEvent).toHaveBeenCalledTimes(1);
  expect(mocks.captureEvent).toHaveBeenCalledWith({ message });
  expect(mocks.captureException).not.toHaveBeenCalled();
});

test("logs strings with extra event information", () => {
  const message = "yooz";
  const extra = {};

  log(message, extra);

  expect(mocks.captureEvent).toHaveBeenCalledTimes(1);
  expect(mocks.captureEvent).toHaveBeenCalledWith({ message, extra });
  expect(mocks.captureException).not.toHaveBeenCalled();
});
