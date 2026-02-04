# Research Log — Mission Control (OpenClaw)

**Date**: 2026-02-01

## Objective
Ground Mission Control’s architecture in verified OpenClaw documentation and repository sources. No assumptions without explicit gaps and rationale.

## Sources Consulted

1. **OpenClaw Docs — Cron Jobs**
   - URL: <https://docs.openclaw.ai/automation/cron-jobs>
   - Evidence: Cron runs inside Gateway; isolated jobs run as `cron:<jobId>`; delivery options; scheduling semantics.

2. **OpenClaw Docs — Heartbeat**
   - URL: <https://docs.openclaw.ai/gateway/heartbeat>
   - Evidence: Heartbeat intervals, prompt behavior, per-agent overrides, `HEARTBEAT_OK` handling.

3. **OpenClaw Docs — Session Management**
   - URL: <https://docs.openclaw.ai/concepts/session>
   - Evidence: Session key formats, session storage locations, reset policy, cron session keys.

4. **OpenClaw Docs — Session Tools**
   - URL: <https://docs.openclaw.ai/concepts/session-tool>
   - Evidence: `sessions_send`, parameters, ping‑pong replies, announce step.

5. **OpenClaw Docs — Gateway Configuration**
   - URL: <https://docs.openclaw.ai/gateway/configuration>
   - Evidence: `agents.list`, `bindings`, per‑agent workspaces, per‑agent heartbeat.

6. **OpenClaw Docs — Multi‑Agent Routing**
   - URL: <https://docs.openclaw.ai/concepts/multi-agent>
   - Evidence: OpenClaw defines agents with isolated workspaces, session keys, and routing examples.

7. **OpenClaw Docs — Workspace Templates (AGENTS/SOUL/HEARTBEAT)**
   - URL: <https://docs.openclaw.ai/reference/templates/AGENTS>
   - Evidence: SOUL/AGENTS/HEARTBEAT are provided templates, not Mission Control features.

8. **OpenClaw Docs — Slack Channel**
   - URL: <https://docs.openclaw.ai/channels/slack>
   - Evidence: Slack socket mode default; config requires app + bot tokens; delivery targets via channel/user ids.

9. **OpenClaw Docs — Telegram Channel**
   - URL: <https://docs.openclaw.ai/channels/telegram>
   - Evidence: Telegram Bot API support; pairing default; mention gating for groups; config via `channels.telegram`.

10. **OpenClaw Docs — Remote Gateway Access**
    - URL: <https://docs.openclaw.ai/gateway/remote>
    - Evidence: Gateway can run on a remote host (VPS) with SSH/tailnet access; clients connect via forwarded WebSocket.

6. **OpenClaw Repository (local clone)**
   - Path: `openclaw-upstream`
   - Evidence: `src/agents/tools/sessions-send-tool.ts` confirms `sessions_send` behavior and required parameters.

## Confirmed Facts (Selected)

- Cron jobs persist in Gateway and can run as isolated sessions; output delivery is configurable. (Cron jobs docs)
- Heartbeats can be configured per agent; default prompt expects `HEARTBEAT_OK`. (Heartbeat docs)
- Session keys follow canonical patterns (`agent:<agentId>:<mainKey>`, `cron:<jobId>`). (Session docs)
- `sessions_send` is the documented session‑to‑session tool, with timeout semantics and reply‑back behavior. (Session tools docs, repo source)
- Multi‑agent routing is defined via `agents.list` and `bindings` in configuration. (Configuration docs)
- SOUL/AGENTS/HEARTBEAT are OpenClaw workspace templates; Mission Control should not re‑implement them. (Templates docs)
- Slack is supported via Socket or HTTP mode; tokens configured under `channels.slack`. (Slack docs)
- Telegram is supported via Bot API; tokens configured under `channels.telegram`. (Telegram docs)
- Remote gateway supports VPS deployment with SSH/tailnet tunnels; loopback bind recommended. (Remote access docs)

## Gaps & Resolutions

- **GAP-001**: Staged agent activation mechanism is not specified in OpenClaw docs or the post.
  - Sources checked: Multi‑agent docs, configuration docs, reference post.
  - Resolution: Treat activation as an operational toggle (poller + cron setup), not a schema change.

- **GAP-002**: Legacy post uses `clawdbot sessions send`; OpenClaw docs do not list a direct `openclaw sessions send` CLI equivalent.
  - Sources checked: CLI docs, tools docs, repo source.
  - Resolution: Use `sessions_send` tool via gateway RPC or `openclaw agent` as the supported mechanism. Documented and testable.

- **GAP-003**: Delivery targets for Slack/Telegram in Mission Control are not specified in the post.
  - Sources checked: Slack docs, Telegram docs, reference post.
  - Resolution: Parameterize channel/target IDs in configuration; enable Slack first, keep Telegram disabled until explicitly requested.

- **GAP-004**: Deployment topology (local vs VPS) is not specified in the post’s step-by-step implementation details.
  - Sources checked: Remote access docs, reference post.
  - Resolution: Support both local dev (remote gateway optional) and VPS deployment; decide per environment during implementation.

## Next Research Needed

- Verify OpenClaw CLI/RPC examples for `sessions_send` usage in scripts (if any exist in docs or repo). If absent, document that as acceptable gap and standardize on gateway tool calls.

- **GAP-005**: No existing TypeScript test runner or project structure found for root-level utilities.
  - Sources checked: repo root, frontend/, backend/.
  - Resolution: Added minimal node:test-based spec but did not run; need test runner decision.
