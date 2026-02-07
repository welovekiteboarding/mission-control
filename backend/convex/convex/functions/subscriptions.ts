import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { ErrorCode, throwError } from "../lib/errors";
import { requireAgent, requireTask } from "../lib/records";

export const subscribe = mutation({
  args: {
    taskId: v.id("tasks"),
    agentId: v.id("agents")
  },
  returns: v.object({
    subscriptionId: v.id("subscriptions")
  }),
  handler: async (ctx, args) => {
    await requireTask(ctx, args.taskId);
    await requireAgent(ctx, args.agentId);

    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_task_agent", (q) => q.eq("taskId", args.taskId).eq("agentId", args.agentId))
      .unique();

    if (existing) {
      return { subscriptionId: existing._id };
    }

    const subscriptionId = await ctx.db.insert("subscriptions", {
      taskId: args.taskId,
      agentId: args.agentId
    });

    return { subscriptionId };
  }
});

export const unsubscribe = mutation({
  args: {
    taskId: v.id("tasks"),
    agentId: v.id("agents")
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireTask(ctx, args.taskId);
    await requireAgent(ctx, args.agentId);

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_task_agent", (q) => q.eq("taskId", args.taskId).eq("agentId", args.agentId))
      .unique();

    if (!subscription) {
      throwError(ErrorCode.NotFound, "Subscription not found");
    }

    await ctx.db.delete(subscription._id);

    return null;
  }
});
