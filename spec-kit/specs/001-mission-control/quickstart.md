# Quickstart — Mission Control Validation

These steps validate core behavior after implementation. Execute in order. Use local-only steps first, then remote OpenClaw steps on the second machine.

## Local Validation (no OpenClaw gateway required)

1. Run Convex tests for schema/functions.
2. Run poller unit tests (mocked OpenClaw client).
3. Run React UI tests for task board and task detail.

## Integration Gate (MacBook with OpenClaw)

1. Run end-to-end Slack delivery via `sessions_send`.
2. Validate cron/heartbeat behavior for multiple agents.
3. Confirm queued notifications drain after gateway restart.

## Core Task Workflow (P1)

1. Create a task in Convex.
2. Assign a single enabled agent.
3. Post a comment as the agent.
4. Verify:
   - Task appears in Inbox.
   - Activity feed logs creation and comment.
   - Task status transitions to In Progress/Review.

## Notification Poller (Slack, Remote OpenClaw)

1. Create a notification targeting an enabled agent.
2. Poller should deliver to Slack within 2 poll cycles.
3. Mark delivered in Convex.

## Standup Summary (Remote OpenClaw)

1. Seed activities for multiple agents.
2. Trigger standup cron.
3. Verify Slack summary output.

## Staged Activation (Remote OpenClaw)

1. Enable only one agent.
2. Verify notifications to disabled agents remain queued.
3. Enable next wave and confirm delivery resumes.

## Deployment Gate (VPS)

1. Deploy Convex, poller, and React UI to the VPS.
2. Run smoke tests only (no feature development on VPS).
3. Confirm Slack delivery and standup summary on VPS.

## Telegram (Deferred)

Telegram remains disabled until explicitly requested. Do not run Telegram tests in this phase.
