# Quickstart — Mission Control Validation

These steps validate core behavior after implementation. Execute in order.

## Core Task Workflow (P1)

1. Create a task in Convex.
2. Assign a single enabled agent.
3. Post a comment as the agent.
4. Verify:
   - Task appears in Inbox.
   - Activity feed logs creation and comment.
   - Task status transitions to In Progress/Review.

## Notification Poller (Slack)

1. Create a notification targeting an enabled agent.
2. Poller should deliver to Slack within 2 poll cycles.
3. Mark delivered in Convex.

## Standup Summary

1. Seed activities for multiple agents.
2. Trigger standup cron.
3. Verify Slack summary output.

## Staged Activation

1. Enable only one agent.
2. Verify notifications to disabled agents remain queued.
3. Enable next wave and confirm delivery resumes.

## Telegram (Deferred)

Telegram remains disabled until explicitly requested. Do not run Telegram tests in this phase.
