jest.mock("./env");

import { isDevelopment, isProduction } from "./env";
import { throwInProduction } from "./error";

test("throws errors in production environemtn", async () => {
  expect(throwInProduction).not.toThrow();

  (isProduction as jest.Mock).mockReturnValue(true);
  (isDevelopment as jest.Mock).mockReturnValue(false);

  expect(throwInProduction).toThrow();
});
