# Deployment Runbook — Mission Control (VPS)

## Scope

This runbook covers VPS deployment of the always‑on OpenClaw Gateway plus Mission Control services (Convex backend, notification poller, React UI). It is activated only after VPS readiness criteria in `spec.md` are met.

## Topology (as specified)

- **OpenClaw Gateway**: runs on a VPS (always‑on control plane).
- **Mission Control Backend**: Convex (hosted) with real‑time tables and functions.
- **Notification Poller**: runs on VPS, polls Convex every 2 seconds, calls OpenClaw `sessions_send`.
- **React UI**: hosted separately (target platform TBD).
- **Slack**: enabled. **Telegram**: framework present but disabled until explicitly requested.

## Prerequisites

- VPS with SSH access.
- Node.js runtime supported by OpenClaw (see OpenClaw install docs).
- OpenClaw installed on the VPS.
- Slack app tokens configured for OpenClaw (`xapp-...`, `xoxb-...`).
- Convex project configured and deployed.

## Steps (VPS)

### 1) Install and run OpenClaw Gateway

- Install OpenClaw on the VPS per official docs.
- Configure `~/.openclaw/openclaw.json` with:
  - `agents.list` entries for 10 agents.
  - `agents.list[].heartbeat.every: "15m"` (or as specified).
  - Slack channel configuration under `channels.slack`.
  - **Telegram disabled** (`channels.telegram.enabled: false`) until requested.
- Start the Gateway as a service (`openclaw gateway install` → `openclaw gateway start`).

### 2) Deploy Convex backend

- Deploy Convex schema and functions for tasks/messages/activities/documents/notifications/subscriptions.
- Record the Convex deployment URL and tokens.

### 3) Deploy Notification Poller (VPS)

- Run the poller as a persistent process on the VPS.
- Use **pm2** (as described in the reference post) for process management.
- Configure poller environment:
  - Convex URL + auth token
  - OpenClaw gateway URL + token
  - Slack delivery target(s)

### 4) Deploy React UI

**GAP**: The reference post does not specify a hosting target for the React UI.

- Resolution: Choose hosting platform during plan phase (e.g., VPS static hosting or managed frontend hosting). Document the final choice before deployment.

### 5) Smoke Test (VPS)

Run the deployment smoke test sequence:

1. Create task → assign agent → agent comment → notification delivered to Slack → UI updates.
2. Trigger standup cron → verify summary posted to Slack.
3. Restart OpenClaw Gateway → confirm poller resumes queued deliveries.

If all pass, VPS deployment is considered complete. Telegram remains disabled until explicitly requested.

## Rollback

- Stop poller service (pm2) and disable scheduled standup cron.
- Keep Convex data intact; no schema rollback required.
- Revert OpenClaw config changes via `config.apply`/`config.patch` if needed.

## Command Templates (to finalize during implementation)

These commands are intentionally placeholders until exact paths/targets are finalized.

### OpenClaw install (VPS)

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

### Gateway config patch (example)

```bash
openclaw gateway call config.patch --params '{
  "raw": "{\\n  agents: { list: [...] },\\n  channels: { slack: { enabled: true } }\\n}\n",
  "baseHash": "<from config.get>"
}'
```

### Poller (pm2)

```bash
pm2 start backend/poller/dist/index.js --name mc-poller
pm2 save
```

### Standup cron (OpenClaw)

```bash
openclaw cron add \
  --name "daily-standup" \
  --cron "30 18 * * *" \
  --tz "UTC" \
  --session isolated \
  --message "Generate daily standup from Mission Control"
```
