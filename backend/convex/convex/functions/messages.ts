import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { notifySubscribers } from "../lib/notifications";
import { requireAgent, requireTask } from "../lib/records";

export const create = mutation({
  args: {
    taskId: v.id("tasks"),
    fromAgentId: v.id("agents"),
    content: v.string(),
    attachments: v.optional(v.array(v.id("documents")))
  },
  returns: v.object({
    messageId: v.id("messages")
  }),
  handler: async (ctx, args) => {
    await requireTask(ctx, args.taskId);
    await requireAgent(ctx, args.fromAgentId);

    const messageId = await ctx.db.insert("messages", {
      taskId: args.taskId,
      fromAgentId: args.fromAgentId,
      content: args.content,
      attachments: args.attachments ?? []
    });

    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_task_agent", (q) => q.eq("taskId", args.taskId).eq("agentId", args.fromAgentId))
      .unique();
    if (!existing) {
      await ctx.db.insert("subscriptions", {
        taskId: args.taskId,
        agentId: args.fromAgentId
      });
    }

    await ctx.db.insert("activities", {
      type: "message_sent",
      agentId: args.fromAgentId,
      message: `Message posted on task`
    });

    await notifySubscribers(
      ctx,
      args.taskId,
      `New message on task`,
      args.fromAgentId
    );

    return { messageId };
  }
});
