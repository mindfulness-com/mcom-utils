import { isProduction } from "./env";

// Proxy file to separate app logic from graphql
export * from "../modules/error/index";

// Export default node Error for convinience which gets
// mapped to INTERNAL_SERVER_ERROR graphql error
const InternalError = Error;
export { InternalError as Error };

export const throwInProduction = () => {
  if (isProduction()) {
    throw new Error("Not allowed in production.");
  }
};
