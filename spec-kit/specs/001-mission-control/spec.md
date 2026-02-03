# Feature Specification: Mission Control (OpenClaw Multi‑Agent Orchestration)

**Feature Branch**: `001-mission-control`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: User description: "Mirror the Mission Control framework exactly (Convex + React + OpenClaw sessions + cron heartbeats + 2s notification poller). Support 10 agents but roll out activation in stages (1 → 3 → 5 → 7 → 9 → 10). TDD only. No guessing; document gaps and research."  

## Development Milestones (Two-Computer Path)

- **Local Dev**: build and test everything without a live OpenClaw gateway (unit/contract/UI tests).
- **Integration Gate (MacBook with OpenClaw)**: run end-to-end `sessions_send` + Slack delivery and cron/heartbeat validation.
- **Deployment Gate (VPS)**: deploy only after Integration Gate passes; run smoke tests only.

## System Boundary (OpenClaw vs Mission Control)

### OpenClaw Provides (Out of Scope to Build)

- Multi-agent routing (`agents.list` + `bindings`), isolated workspaces, sessions, and session keys.
- Workspace templates: `AGENTS.md`, `SOUL.md`, `HEARTBEAT.md`, `TOOLS.md`, `USER.md`.
- Cron scheduler (isolated sessions) and heartbeat behavior.
- Session tools such as `sessions_send` for cross-session messaging.
- Agent-to-agent messaging configuration (`tools.agentToAgent`).
- Mention gating, broadcast groups, and channel routing.

### Mission Control Builds (In Scope)

- Convex schema + functions for tasks, messages, activities, documents, notifications, and subscriptions.
- React UI (Activity Feed, Task Board, Agent Cards, Document Panel, Task Detail View).
- Notification poller daemon (Convex → OpenClaw `sessions_send` bridge, 2-second interval).
- Daily standup generator (aggregate Convex activity + deliver summary to Slack; Telegram remains disabled).
- Thread subscription logic (auto-subscribe on interaction).
- Staged agent activation as an operational process (no schema changes to the post’s data model).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create and Track a Task (Priority: P1)

As the operator, I can create a task in Mission Control, assign it to an agent, and observe real‑time updates as the agent comments and changes status.

**Why this priority**: This is the core workflow described in the post; without it, Mission Control has no operational value.

**Independent Test**: Fully testable by creating one task, assigning one agent, posting one comment, and moving status to Review.

**Acceptance Scenarios**:

1. **Given** an empty task board, **When** I create a task with title and description, **Then** it appears in the Inbox column and an activity entry is recorded.
2. **Given** a task in Inbox, **When** I assign an agent and move it to In Progress, **Then** the assignee list updates and the activity feed records the change.

---

### User Story 2 - Agent Posts Work via Convex (Priority: P1)

As an agent, I can post comments and documents to a task via Convex functions so the team sees work in one shared thread.

**Why this priority**: Shared context and collaboration are the primary value proposition of Mission Control.

**Independent Test**: Post a comment and a document for a task and verify they appear in the UI and activity feed.

**Acceptance Scenarios**:

1. **Given** a task exists, **When** an agent posts a message, **Then** the comment appears under the task with the agent identity and activity is logged.
2. **Given** a task exists, **When** an agent creates a document, **Then** the document appears in the Document Panel and is linked to the task.

---

### User Story 3 - Notification Delivery via Poller (Priority: P1)

As the system, I deliver @mention and subscription notifications to agents through OpenClaw, queueing when agents are asleep.

**Why this priority**: The post’s system depends on queued delivery and heartbeat wakeups.

**Independent Test**: Create a notification and verify it is delivered via OpenClaw when the agent session is reachable.

**Acceptance Scenarios**:

1. **Given** an undelivered notification, **When** the poller runs and the agent is reachable, **Then** `sessions_send` succeeds and the notification is marked delivered.
2. **Given** an undelivered notification and the agent is asleep, **When** delivery fails, **Then** the notification remains queued and is retried later.

---

### User Story 4 - Daily Standup Summary (Priority: P2)

As the operator, I receive a daily standup summary compiled from Mission Control activity and delivered to Slack.

**Why this priority**: The post emphasizes daily standups as the visibility and accountability mechanism.

**Independent Test**: Seed activity for multiple agents and verify a standup summary is generated and delivered.

**Acceptance Scenarios**:

1. **Given** activities for the current day, **When** the standup cron runs, **Then** a summary is posted to the configured Slack target.
2. **Given** no activity for the day, **When** the standup cron runs, **Then** the summary states no completed or in-progress items.

---

### User Story 5 - Staged Agent Activation (Priority: P2)

As the operator, I can activate agents in stages (1 → 3 → 5 → 7 → 9 → 10) without changing the framework.

**Why this priority**: Reduces risk while validating behavior at each scale.

**Independent Test**: Enable one agent and verify only that agent receives heartbeats and notifications.

**Acceptance Scenarios**:

1. **Given** only one agent is enabled, **When** a notification targets a disabled agent, **Then** it stays queued until that agent is enabled.
2. **Given** a new activation wave, **When** its cron jobs are enabled, **Then** the agents begin heartbeats on schedule.

---

### User Story 6 - Thread Subscriptions (Priority: P3)

As an agent, I am automatically subscribed to a task thread when I interact with it, so I receive future updates without repeated @mentions.

**Why this priority**: Thread subscriptions are required for natural collaboration flow in the post.

**Independent Test**: Comment on a task and verify subsequent comments generate notifications without explicit @mention.

**Acceptance Scenarios**:

1. **Given** an agent comments on a task, **When** another comment is posted, **Then** the agent receives a notification without @mention.
2. **Given** an agent is assigned to a task, **When** a comment is posted, **Then** the agent is notified even without @mention.

---

### Edge Cases

- What happens when the notification poller cannot reach the OpenClaw gateway?
- What happens when two agents update the same task simultaneously?
- How does the system handle missing or malformed session keys for `sessions_send`?
- What happens when Convex rate limits or transient errors occur during polling?
- How does the poller handle duplicate delivery attempts after restart?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use Convex as the backend with real‑time updates for tasks, messages, documents, activities, and notifications.
- **FR-002**: System MUST provide a React UI with Activity Feed, Task Board, Agent Cards, Document Panel, and Task Detail View.
- **FR-003**: System MUST support 10 agents in the data model and routing configuration.
- **FR-004**: System MUST deliver notifications via a 2‑second polling daemon that calls OpenClaw `sessions_send`.
- **FR-005**: System MUST support staged activation of agents without schema changes (operational toggles only).
- **FR-006**: Agents MUST be able to create messages and documents through Convex functions.
- **FR-007**: Heartbeats MUST be scheduled through OpenClaw cron (isolated sessions) as described in the post.
- **FR-008**: System MUST generate a daily standup summary from Convex activity and deliver it to Slack.
- **FR-009**: System MUST implement thread subscriptions that auto‑subscribe on interaction and assignment.
- **FR-010**: Mission Control MUST integrate with OpenClaw through documented session tools (`sessions_send`) rather than re‑implementing agent runtime.
- **FR-011**: Mission Control MUST implement Slack messaging first; Telegram delivery is disabled until explicitly requested after completion.
- **FR-012**: Mission Control MUST include a Telegram-ready integration framework (config + delivery path) but keep it off by default.
- **FR-013**: The system MUST support running OpenClaw on a remote VPS (gateway) with SSH/tailnet access, while allowing local development with a remote gateway.

### Key Entities *(include if feature involves data)*

- **Agent**: Name, role, status, current task, session key.
- **Task**: Title, description, status, assignees.
- **Message**: Task reference, author agent, content, attachments.
- **Activity**: Type, agent, message.
- **Document**: Title, content (Markdown), type, task reference.
- **Notification**: Mentioned agent, content, delivered flag.
- **Subscription**: Task reference, agent reference (for thread subscription).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A task can be created, assigned, commented on, and moved to Review in under 2 minutes end‑to‑end.
- **SC-002**: Notification delivery succeeds for reachable agents within 2 poll cycles (≤4 seconds).
- **SC-003**: UI reflects new tasks/comments/documents in real time without refresh.
- **SC-004**: Enabling a new agent wave results in successful heartbeat runs within the next scheduled interval.
- **SC-005**: Poller resumes draining queued notifications after an OpenClaw gateway restart without data loss.
- **SC-006**: Standup summary correctly aggregates activity across up to 10 agents.
- **SC-007**: Slack delivery succeeds for reachable agents within 2 poll cycles (≤4 seconds).

## Deployment *(mandatory)*

### Environments

- **Local Dev**: Mission Control services run locally; OpenClaw may run locally or on a remote gateway accessed via SSH/tailnet.
- **VPS**: OpenClaw Gateway runs on a VPS as the always‑on control plane; Mission Control services are deployed to the same VPS or a managed platform.

### VPS Readiness Criteria

Mission Control is ready to deploy to a VPS when **all** of the following are true:

1. **TDD Coverage**: All P1 and P2 stories have passing tests (unit + integration), including poller delivery and standup generation.
2. **Slack Delivery Verified**: End‑to‑end Slack delivery works against a real OpenClaw gateway.
3. **Poller Resilience**: Poller recovers cleanly from gateway restarts and continues draining queued notifications.
4. **Staged Activation**: Agent enablement waves (1 → 3 → 5 → 7 → 9 → 10) have been exercised locally without regressions.
5. **Operational Config**: Environment variables, tokens, and delivery targets are parameterized and documented.

### VPS Deployment Trigger

Deploy to VPS **immediately after** VPS Readiness Criteria are satisfied and a final smoke test passes:

- Create task → assign agent → agent comment → notification → UI update
- Run standup cron → summary delivered to Slack

Telegram remains disabled until explicitly requested post‑deployment.

## Research & Gaps *(mandatory)*

### Sources Consulted

- OpenClaw docs: Cron jobs (scheduler behavior, isolated runs). <https://docs.openclaw.ai/automation/cron-jobs>
- OpenClaw docs: Heartbeat configuration and behavior. <https://docs.openclaw.ai/gateway/heartbeat>
- OpenClaw docs: Session management and session keys. <https://docs.openclaw.ai/concepts/session>
- OpenClaw docs: Session tools (`sessions_send`). <https://docs.openclaw.ai/concepts/session-tool>
- OpenClaw docs: Multi‑agent routing (`agents.list` + `bindings`). <https://docs.openclaw.ai/gateway/configuration>
- OpenClaw docs: Multi‑agent routing examples and workspace templates. <https://docs.openclaw.ai/concepts/multi-agent>
- OpenClaw docs: Workspace template references (AGENTS/SOUL/HEARTBEAT). <https://docs.openclaw.ai/reference/templates/AGENTS>
- OpenClaw docs: Slack channel setup (Socket/HTTP mode, tokens). <https://docs.openclaw.ai/channels/slack>
- OpenClaw docs: Telegram channel setup (Bot API, config). <https://docs.openclaw.ai/channels/telegram>
- OpenClaw docs: Remote gateway access (SSH/tailnet, VPS). <https://docs.openclaw.ai/gateway/remote>
- OpenClaw repo (source): `openclaw-upstream` cloned locally for code‑level reference.
- Mission Control reference post (verbatim scrape): `Mission-Control-Twitter-Thread.md`.

### Confirmed Facts

- OpenClaw cron supports isolated jobs with dedicated sessions (`cron:<jobId>`) and optional delivery. (Cron docs)
- Heartbeat runs are configurable per agent via `agents.list[].heartbeat` and default at 30m unless overridden. (Heartbeat docs)
- Session keys follow `agent:<agentId>:<mainKey>` for direct chats and specific formats for groups/cron. (Session docs)
- `sessions_send` can target a session key or session id and supports timeout/async behavior. (Session tools docs)
- Multi‑agent routing uses `agents.list` with per‑agent settings and `bindings` for routing. (Configuration docs)
- SOUL/AGENTS/HEARTBEAT are OpenClaw workspace templates, not Mission Control features. (Templates docs)
- The reference post describes a 2‑second polling daemon (via pm2) and daily standup summary delivery. (Mission-Control-Twitter-Thread.md)
- Slack is supported via Socket mode (default) or HTTP mode with `channels.slack` config. (Slack docs)
- Telegram is supported via Bot API with `channels.telegram` config, pairing defaults, and mention‑gated groups. (Telegram docs)
- OpenClaw supports running the gateway on a remote host (VPS) with SSH/tailnet access; clients connect via forwarded WebSocket. (Remote access docs)

### Gaps & Resolutions

- **GAP-001**: Staged agent activation mechanism is not specified in OpenClaw docs or the post.
  - Sources checked: OpenClaw docs (multi‑agent, cron, heartbeat), reference post.
  - What’s missing: A canonical method for enabling agents in waves.
  - Resolution: Treat activation as an operational toggle (config list used by poller + cron setup). This avoids schema changes and can be reversed.
- **GAP-002**: No documented OpenClaw CLI subcommand for `sessions send` (only `sessions` list is documented).
  - Sources checked: CLI docs, repo source, tools docs.
  - What’s missing: A direct `openclaw sessions send` CLI entry.
  - Resolution: Use Gateway tool `sessions_send` via RPC (`openclaw gateway call`) or through an agent run (`openclaw agent`).
- **GAP-003**: Delivery target for Slack/Telegram in Mission Control is not specified in the post.
  - Sources checked: Slack docs, Telegram docs, reference post.
  - What’s missing: Exact channel IDs/targets and routing strategy.
  - Resolution: Parameterize delivery targets in configuration; default to Slack only. Telegram remains disabled until explicitly enabled.
- **GAP-004**: Deployment choice (local vs VPS) is not specified in the post’s step-by-step implementation details.
  - Sources checked: OpenClaw remote access docs, reference post.
  - What’s missing: Exact deployment topology and auth details.
  - Resolution: Support both local dev with remote gateway and full VPS deployment; choose per environment during implementation.
