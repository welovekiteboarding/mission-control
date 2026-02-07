import { ConvexClient } from "./convex.js";
import {
  AgentRecord,
  NotificationRecord,
  NotificationStore
} from "./poller.js";

const parseNotification = (input: {
  id: string;
  mentionedAgentId: string;
  content: string;
  delivered: boolean;
  retryCount: number;
  nextAttemptAt?: string | null;
}): NotificationRecord => ({
  ...input,
  nextAttemptAt: input.nextAttemptAt ? new Date(input.nextAttemptAt) : null
});

export const createConvexNotificationStore = (
  client: ConvexClient
): NotificationStore => ({
  listPendingNotifications: async (limit) => {
    const results = await client.query<
      Array<{
        id: string;
        mentionedAgentId: string;
        content: string;
        delivered: boolean;
        retryCount: number;
        nextAttemptAt?: string | null;
      }>
    >("notifications.listPending", { limit });

    return results.map(parseNotification);
  },
  getAgentById: (id) =>
    client.query<AgentRecord | null>("agents.getById", { id }),
  markDelivered: async (id) => {
    await client.mutation("notifications.markDelivered", { id });
  },
  recordRetry: async ({ id, retryCount, nextAttemptAt }) => {
    await client.mutation("notifications.recordRetry", {
      id,
      retryCount,
      nextAttemptAt: nextAttemptAt.toISOString()
    });
  }
});
