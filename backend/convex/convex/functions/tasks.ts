import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { ErrorCode, throwError } from "../lib/errors";
import { notifySubscribers } from "../lib/notifications";
import { requireAgent, requireTask } from "../lib/records";
import { taskStatusValidator } from "../lib/validators";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    actorId: v.id("agents")
  },
  returns: v.object({
    taskId: v.id("tasks")
  }),
  handler: async (ctx, args) => {
    await requireAgent(ctx, args.actorId);

    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      status: "inbox",
      assigneeIds: []
    });

    await ctx.db.insert("activities", {
      type: "task_created",
      agentId: args.actorId,
      message: `Created task: ${args.title}`
    });

    return { taskId };
  }
});

export const update = mutation({
  args: {
    taskId: v.id("tasks"),
    actorId: v.id("agents"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(taskStatusValidator)
  },
  returns: v.object({
    taskId: v.id("tasks")
  }),
  handler: async (ctx, args) => {
    await requireAgent(ctx, args.actorId);
    const task = await requireTask(ctx, args.taskId);

    const updates: Record<string, string> = {};
    if (args.title !== undefined) {
      updates.title = args.title;
    }
    if (args.description !== undefined) {
      updates.description = args.description;
    }
    if (args.status !== undefined) {
      updates.status = args.status;
    }

    if (Object.keys(updates).length === 0) {
      throwError(ErrorCode.InvalidInput, "No updates provided");
    }

    await ctx.db.patch(task._id, updates);

    await ctx.db.insert("activities", {
      type: "task_updated",
      agentId: args.actorId,
      message: `Updated task: ${task.title}`
    });

    return { taskId: task._id };
  }
});

export const assign = mutation({
  args: {
    taskId: v.id("tasks"),
    actorId: v.id("agents"),
    assigneeIds: v.array(v.id("agents"))
  },
  returns: v.object({
    taskId: v.id("tasks")
  }),
  handler: async (ctx, args) => {
    await requireAgent(ctx, args.actorId);
    const task = await requireTask(ctx, args.taskId);

    if (args.assigneeIds.length === 0) {
      throwError(ErrorCode.InvalidInput, "Assignee list cannot be empty");
    }

    for (const agentId of args.assigneeIds) {
      await requireAgent(ctx, agentId);
    }

    const nextStatus = task.status === "inbox" ? "assigned" : task.status;

    await ctx.db.patch(task._id, {
      assigneeIds: args.assigneeIds,
      status: nextStatus
    });

    for (const agentId of args.assigneeIds) {
      const existing = await ctx.db
        .query("subscriptions")
        .withIndex("by_task_agent", (q) => q.eq("taskId", task._id).eq("agentId", agentId))
        .unique();
      if (!existing) {
        await ctx.db.insert("subscriptions", { taskId: task._id, agentId });
      }
    }

    await ctx.db.insert("activities", {
      type: "task_updated",
      agentId: args.actorId,
      message: `Assigned task: ${task.title}`
    });

    await notifySubscribers(
      ctx,
      task._id,
      `Task updated: ${task.title} assigned`,
      args.actorId
    );

    return { taskId: task._id };
  }
});
