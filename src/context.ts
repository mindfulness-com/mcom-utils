import * as Graph from "../types/graph-schema";
import { RequestContext } from "../app/types";

export const isAdmin = (context: RequestContext): boolean => {
  return !!context.session && context.session.role === Graph.UserRole.Admin;
};

export const whenAdmin = <T>(
  context: RequestContext,
  doWork: () => T,
): Maybe<T> => {
  if (isAdmin(context)) {
    return doWork();
  }
  return;
};
