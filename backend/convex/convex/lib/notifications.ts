import { Id } from "convex/values";
import { MutationCtx } from "./records";

const DEFAULT_MAX_RETRIES = 5;

export async function createNotification(
  ctx: MutationCtx,
  args: {
    mentionedAgentId: Id<"agents">;
    content: string;
    maxRetries?: number;
  }
) {
  return ctx.db.insert("notifications", {
    mentionedAgentId: args.mentionedAgentId,
    content: args.content,
    delivered: false,
    attemptCount: 0,
    lastAttemptAt: undefined,
    maxRetries: args.maxRetries ?? DEFAULT_MAX_RETRIES
  });
}

export async function notifySubscribers(
  ctx: MutationCtx,
  taskId: Id<"tasks">,
  content: string,
  actorId?: Id<"agents">
) {
  const subscriptions = await ctx.db
    .query("subscriptions")
    .withIndex("by_task", (q) => q.eq("taskId", taskId))
    .collect();

  const targets = subscriptions
    .map((subscription) => subscription.agentId)
    .filter((agentId) => agentId !== actorId);

  for (const agentId of targets) {
    await createNotification(ctx, { mentionedAgentId: agentId, content });
  }
}
