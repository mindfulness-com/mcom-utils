import * as Graph from "../types/graph-schema";
import { SecureRequestContext } from "../app/types";
import Analytics = require("analytics-node");
import { getEnvVar, getInfraEnv } from "./env";

type Primitive = string | boolean | number;

const segment = new Analytics(getEnvVar("SEGMENT_API_KEY"), {
  flushAt: 30,
  flushInterval: 5,
});

export const trackEvent = async (
  context: SecureRequestContext,
  event: Graph.EventInput,
) =>
  segment.track({
    userId: context.session.publicId,
    event: event.name,
    properties: {
      environment: getInfraEnv(),
      ...event.properties,
    },
    timestamp: event.timestamp,
  });

export const trackEvents = async (
  context: SecureRequestContext,
  events: Graph.EventInput[],
) => events.map(event => trackEvent(context, event));

export const updateTraits = async (user: Graph.User) => {
  await segment.identify({
    userId: user.publicId,
    traits: { cohorts: user.cohorts },
    timestamp: new Date(),
  });
};
