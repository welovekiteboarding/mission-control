import { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import { Id } from "convex/values";
import { ErrorCode, throwError } from "./errors";

export type MutationCtx = GenericMutationCtx<any>;
export type QueryCtx = GenericQueryCtx<any>;

export async function requireAgent(ctx: MutationCtx | QueryCtx, agentId: Id<"agents">) {
  const agent = await ctx.db.get(agentId);
  if (!agent) {
    throwError(ErrorCode.NotFound, "Agent not found");
  }
  return agent;
}

export async function requireTask(ctx: MutationCtx | QueryCtx, taskId: Id<"tasks">) {
  const task = await ctx.db.get(taskId);
  if (!task) {
    throwError(ErrorCode.NotFound, "Task not found");
  }
  return task;
}

export async function requireSubscription(
  ctx: MutationCtx | QueryCtx,
  taskId: Id<"tasks">,
  agentId: Id<"agents">
) {
  const subscription = await ctx.db
    .query("subscriptions")
    .withIndex("by_task_agent", (q) => q.eq("taskId", taskId).eq("agentId", agentId))
    .unique();
  if (!subscription) {
    throwError(ErrorCode.NotFound, "Subscription not found");
  }
  return subscription;
}
