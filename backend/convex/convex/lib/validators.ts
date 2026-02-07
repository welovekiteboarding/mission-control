import { v } from "convex/values";

export const agentStatusValidator = v.union(
  v.literal("idle"),
  v.literal("active"),
  v.literal("blocked")
);

export const taskStatusValidator = v.union(
  v.literal("inbox"),
  v.literal("assigned"),
  v.literal("in_progress"),
  v.literal("review"),
  v.literal("done")
);

export const activityTypeValidator = v.union(
  v.literal("task_created"),
  v.literal("message_sent"),
  v.literal("document_created"),
  v.literal("task_updated"),
  v.literal("notification_sent")
);

export const documentTypeValidator = v.union(
  v.literal("deliverable"),
  v.literal("research"),
  v.literal("protocol"),
  v.literal("other")
);
