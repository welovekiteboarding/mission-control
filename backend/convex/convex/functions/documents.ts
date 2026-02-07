import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAgent, requireTask } from "../lib/records";
import { documentTypeValidator } from "../lib/validators";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    type: documentTypeValidator,
    taskId: v.optional(v.id("tasks")),
    agentId: v.id("agents")
  },
  returns: v.object({
    documentId: v.id("documents")
  }),
  handler: async (ctx, args) => {
    await requireAgent(ctx, args.agentId);

    if (args.taskId) {
      await requireTask(ctx, args.taskId);
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      content: args.content,
      type: args.type,
      taskId: args.taskId ?? null
    });

    if (args.taskId) {
      const existing = await ctx.db
        .query("subscriptions")
        .withIndex("by_task_agent", (q) => q.eq("taskId", args.taskId).eq("agentId", args.agentId))
        .unique();
      if (!existing) {
        await ctx.db.insert("subscriptions", {
          taskId: args.taskId,
          agentId: args.agentId
        });
      }
    }

    await ctx.db.insert("activities", {
      type: "document_created",
      agentId: args.agentId,
      message: `Document created: ${args.title}`
    });

    return { documentId };
  }
});
