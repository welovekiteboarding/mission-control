import { mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { ErrorCode, throwError } from "../lib/errors";
import { createNotification } from "../lib/notifications";

export const listUndelivered = query({
  args: {
    limit: v.optional(v.number())
  },
  returns: v.array(
    v.object({
      _id: v.id("notifications"),
      _creationTime: v.number(),
      mentionedAgentId: v.id("agents"),
      content: v.string(),
      delivered: v.boolean(),
      lastAttemptAt: v.optional(v.number()),
      attemptCount: v.optional(v.number()),
      maxRetries: v.optional(v.number())
    })
  ),
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return ctx.db
      .query("notifications")
      .withIndex("by_delivered", (q) => q.eq("delivered", false))
      .order("asc")
      .take(limit);
  }
});

export const markDelivered = mutation({
  args: {
    notificationId: v.id("notifications")
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);
    if (!notification) {
      throwError(ErrorCode.NotFound, "Notification not found");
    }

    await ctx.db.patch(args.notificationId, {
      delivered: true,
      lastAttemptAt: Date.now(),
      attemptCount: (notification.attemptCount ?? 0) + 1
    });

    return null;
  }
});

export const create = mutation({
  args: {
    mentionedAgentId: v.id("agents"),
    content: v.string(),
    maxRetries: v.optional(v.number())
  },
  returns: v.object({
    notificationId: v.id("notifications")
  }),
  handler: async (ctx, args) => {
    const notificationId = await createNotification(ctx, {
      mentionedAgentId: args.mentionedAgentId,
      content: args.content,
      maxRetries: args.maxRetries
    });

    return { notificationId };
  }
});
