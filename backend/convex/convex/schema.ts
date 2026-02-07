import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { activityTypeValidator, agentStatusValidator, documentTypeValidator, taskStatusValidator } from "./lib/validators";

export default defineSchema({
  agents: defineTable({
    name: v.string(),
    role: v.string(),
    status: agentStatusValidator,
    currentTaskId: v.union(v.id("tasks"), v.null()),
    sessionKey: v.string(),
    enabled: v.boolean()
  })
    .index("by_sessionKey", ["sessionKey"])
    .index("by_enabled", ["enabled"]),
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: taskStatusValidator,
    assigneeIds: v.array(v.id("agents"))
  }).index("by_status", ["status"]),
  messages: defineTable({
    taskId: v.id("tasks"),
    fromAgentId: v.id("agents"),
    content: v.string(),
    attachments: v.array(v.id("documents"))
  })
    .index("by_task", ["taskId"])
    .index("by_agent", ["fromAgentId"]),
  activities: defineTable({
    type: activityTypeValidator,
    agentId: v.id("agents"),
    message: v.string()
  }).index("by_agent", ["agentId"]),
  documents: defineTable({
    title: v.string(),
    content: v.string(),
    type: documentTypeValidator,
    taskId: v.union(v.id("tasks"), v.null())
  }).index("by_task", ["taskId"]),
  notifications: defineTable({
    mentionedAgentId: v.id("agents"),
    content: v.string(),
    delivered: v.boolean(),
    lastAttemptAt: v.optional(v.number()),
    attemptCount: v.optional(v.number()),
    maxRetries: v.optional(v.number())
  })
    .index("by_agent", ["mentionedAgentId"])
    .index("by_delivered", ["delivered"])
    .index("by_agent_delivered", ["mentionedAgentId", "delivered"]),
  subscriptions: defineTable({
    taskId: v.id("tasks"),
    agentId: v.id("agents")
  })
    .index("by_task", ["taskId"])
    .index("by_agent", ["agentId"])
    .index("by_task_agent", ["taskId", "agentId"])
});
