# Implementation Plan: Mission Control (OpenClaw Multi‑Agent Orchestration)

**Branch**: `001-mission-control` | **Date**: 2026-02-01 | **Spec**: `specs/001-mission-control/spec.md`
**Input**: Feature specification from `/specs/001-mission-control/spec.md`

## Summary

Implement Mission Control as a thin coordination layer on top of OpenClaw: Convex backend + React UI + notification poller + daily standup, with staged agent activation (1→3→5→7→9→10). Slack delivery is implemented first; Telegram framework is present but disabled until explicitly requested. All development follows strict TDD and no‑guessing rules with explicit research gaps.

## Technical Context

**Language/Version**: TypeScript (Node.js for poller), React (UI), Convex (TypeScript functions)  
**Primary Dependencies**: Convex, React, OpenClaw Gateway (external), pm2 (poller process)  
**Storage**: Convex (tables per spec)  
**Testing**: Vitest for TS + React Testing Library for UI + Convex test utilities; Playwright for critical E2E only  
**Target Platform**: Local dev + VPS (OpenClaw Gateway runs on VPS; Mission Control services can be local or deployed)  
**Project Type**: Web application + background worker  
**Performance Goals**: Notification delivery within 2 poll cycles (≤4 seconds)  
**Constraints**: Slack first, Telegram disabled until explicitly requested; 10‑agent support with staged activation  
**Scale/Scope**: Single workspace; up to 10 agents

## Two-Computer Development Split

**Local Development Machine (this repo)**
- Implement and test everything that does not require a live OpenClaw gateway.
- Convex schema/functions + contract tests.
- Poller logic with mocked OpenClaw client (unit tests for retry/skip/backoff).
- React UI + UI tests.
- Standup generator logic tests.

**Remote OpenClaw Machine**
- Run OpenClaw gateway and real channels.
- Execute end-to-end integration tests for `sessions_send` + Slack delivery.
- Validate cron/heartbeat behavior and real delivery targets.

**Handoff Trigger**
- Move to remote testing once all local unit/contract/UI tests pass and the poller is wired to the OpenClaw client interface with mocks.

## Milestones

**Integration Gate (MacBook with OpenClaw)**
- Trigger: all local unit/contract/UI tests pass.
- Run: end-to-end OpenClaw `sessions_send` + Slack delivery, cron/heartbeat validation.
- Outcome: stable integration baseline before any VPS deployment.

**Deployment Gate (VPS)**
- Trigger: Integration Gate passes on the MacBook.
- Run: VPS deployment + smoke tests only (no feature development).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- No guessing: all decisions grounded in OpenClaw docs and the reference post (gaps logged).
- TDD: tests must exist before implementation for every feature slice.
- Mirror post architecture: Convex + React + OpenClaw cron/heartbeat + poller.

## Project Structure

### Documentation (this feature)

```text
specs/001-mission-control/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── deployment-runbook.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── convex/
│   ├── convex/
│   │   ├── schema.ts
│   │   └── *.ts
│   └── convex.json
├── poller/
│   ├── src/
│   └── tests/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**Structure Decision**: Web application + worker. Convex lives in `backend/convex`, poller is a Node service under `backend/poller`, React UI under `frontend`.

## Phase 0 — Research Consolidation

- Confirm OpenClaw session tools and routing behavior (done in `research.md`).
- Verify Slack/Telegram channel configurations in OpenClaw docs.
- Identify any gaps (logged in `research.md` and spec).

## Phase 1 — Data Model & Contracts

### Convex Data Model (per reference post)

- agents
- tasks
- messages
- activities
- documents
- notifications
- subscriptions (thread subscriptions)

Document exact fields in `data-model.md` (mirrors reference post schema, plus `enabled` flag for staged activation as operational toggle if needed by poller).

### Contracts

- `tasks.create`, `tasks.update`, `tasks.assign`
- `messages.create`
- `documents.create`
- `notifications.create`, `notifications.markDelivered`
- `subscriptions.subscribe`, `subscriptions.unsubscribe`
- `activities.log`

Create contracts in `contracts/` with request/response shapes and error cases (gateway unreachable, invalid session key, rate limits).

## Phase 2 — Implementation Plan (TDD)

1. **Convex schema + functions**
   - Write unit tests for each function first.
   - Implement schema and functions to pass tests.

2. **Notification poller (Slack only)**
   - Tests: queue retry, delivery success, gateway unavailable.
   - Implementation: poll every 2s; call OpenClaw `sessions_send` via gateway RPC (no CLI command assumed).

### Notification Poller Behavior (clarified)

- **Processing model**: sequential processing (rate‑limit safe) with cursor‑based pagination.
- **Resolution**: look up agent by `mentionedAgentId` and use `sessionKey`.
- **Filter**: skip if `agent.enabled == false` or `delivered == true`.
- **Retries**: exponential backoff (2s → 4s → 8s → 16s) on gateway unreachable or rate limit errors.
- **Max attempts**: respect `notifications.maxRetries` (default 5); stop retrying after max.
- **Duplicate prevention**: use Convex transaction for read → send → mark delivered.
- **Restart behavior**: drain existing queue before processing newly created notifications.

3. **React UI**
   - Tests for task board, activity feed, agent cards, document panel, task details.
   - Real‑time updates via Convex subscriptions.

### React UI Stack (minimal)

- **State**: React Context for Convex queries + local UI state.
- **Routing**: none (single‑page dashboard).
- **Components**: Tailwind CSS + headless primitives (no heavy component library).
- **Realtime**: Convex `useQuery` hooks.

4. **Daily standup generator**
   - Tests: correct aggregation + Slack delivery.
   - Runs via OpenClaw cron or scheduled job (per post).

5. **Thread subscriptions**
   - Tests: auto‑subscribe on comment/assignment; notification routing without @mention.

6. **Staged activation**
   - Tests: enabling waves toggles poller delivery + cron heartbeats for those agents only.

## Deployment Runbook (Expanded)

### Local Dev

1. Run Convex locally.
2. Run poller locally with OpenClaw Gateway reachable (local or remote).
3. Run React UI locally.
4. Use Slack sandbox channel for delivery validation.

### VPS Deployment

**Trigger**: All readiness criteria in `spec.md` satisfied.

1. Install OpenClaw on VPS and configure `openclaw.json`.
2. Run Gateway as a service.
3. Deploy Convex (hosted).
4. Deploy poller to VPS (pm2).
5. Deploy React UI (hosting target finalized at plan execution).
6. Run VPS smoke tests.

### Rollback

- Stop poller (pm2), disable cron jobs, keep Convex state intact.
- Revert OpenClaw config if needed.

## Testing and Validation

- Unit tests for Convex functions and poller logic.
- Integration tests with OpenClaw gateway and Slack delivery.
- E2E: task → assign → comment → notification → UI update.
- Standup cron smoke test.

## Risks and Edge Cases

- OpenClaw gateway unreachable or auth misconfigured.
- Convex rate limits or transient errors during polling.
- Duplicate delivery on poller restart.
- Invalid session keys for `sessions_send`.

## Open Questions

- Exact hosting target for React UI (managed vs VPS static hosting) — must be chosen before VPS deployment.
