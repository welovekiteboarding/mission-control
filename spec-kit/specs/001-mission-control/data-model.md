# Data Model — Mission Control (Convex)

This model mirrors the reference post’s schema and adds only what is required for staged activation or subscriptions. Any additions beyond the post are flagged.

## agents

```ts
agents: {
  name: string,            // "Shuri"
  role: string,            // "Product Analyst"
  status: "idle" | "active" | "blocked",
  currentTaskId: Id<"tasks"> | null,
  sessionKey: string,      // "agent:product-analyst:main"
  enabled: boolean,
}
```

## tasks

```ts
tasks: {
  title: string,
  description: string,
  status: "inbox" | "assigned" | "in_progress" | "review" | "done",
  assigneeIds: Id<"agents">[],
}
```

## messages

```ts
messages: {
  taskId: Id<"tasks">,
  fromAgentId: Id<"agents">,
  content: string,
  attachments: Id<"documents">[],
}
```

## activities

```ts
activities: {
  type: "task_created" | "message_sent" | "document_created" | "task_updated" | "notification_sent",
  agentId: Id<"agents">,
  message: string,
}
```

## documents

```ts
documents: {
  title: string,
  content: string, // Markdown
  type: "deliverable" | "research" | "protocol" | "other",
  taskId: Id<"tasks"> | null,
}
```

## notifications

```ts
notifications: {
  mentionedAgentId: Id<"agents">,
  content: string,
  delivered: boolean,
  // optional metadata for poller retries
  lastAttemptAt?: number,
  attemptCount?: number,
  maxRetries?: number,
}
```

## subscriptions (Mission Control addition)

```ts
subscriptions: {
  taskId: Id<"tasks">,
  agentId: Id<"agents">,
}
```

## Rationale for agents.enabled

Staged activation requires the poller to filter which agents receive notifications without querying OpenClaw config on every poll cycle. OpenClaw config remains source‑of‑truth for agent existence; `agents.enabled` is the Mission Control operational toggle.

## Notes / Gaps

- `subscriptions` table is not explicitly in the post but is required for thread subscription behavior described.
