import * as Graph from "../types/graph-schema";
import { RequestContext, SecureRequestContext } from "../app/types";
import { AuthRequired, Forbidden } from "./error";

export const isSecureContext = (
  context: RequestContext,
): context is SecureRequestContext => !!(context.token && context.session);

export const required = <R, P, A>(
  secureResolver: Graph.Resolver<R, P, SecureRequestContext, A>,
): Graph.Resolver<R, P, RequestContext, A> => (parent, args, context, info) => {
  if (!isSecureContext(context)) {
    throw new AuthRequired();
  }

  return secureResolver(parent, args, context, info);
};

export const admin = <R, P, A>(
  secureResolver: Graph.Resolver<R, P, SecureRequestContext, A>,
): Graph.Resolver<R, P, RequestContext, A> => (parent, args, context, info) => {
  if (!isSecureContext(context)) {
    throw new AuthRequired();
  }

  if (context.session.role !== Graph.UserRole.Admin) {
    throw new Forbidden();
  }

  return secureResolver(parent, args, context, info);
};

export default { required, admin };
