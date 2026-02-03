# Tasks: Mission Control (OpenClaw Multi‑Agent Orchestration)

**Input**: Design documents from `/specs/001-mission-control/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: REQUIRED (TDD only). Write tests first; ensure they fail before implementation.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create project structure per plan (`backend/convex`, `backend/poller`, `frontend`) with placeholder README files.
- [ ] T002 Initialize Convex project in `backend/convex` and wire `schema.ts` scaffolding.
- [ ] T003 Initialize React app in `frontend` with Tailwind CSS (no routing, single dashboard page).
- [ ] T004 [P] Configure Vitest for backend (Convex + poller) and React Testing Library + Vitest for frontend.
- [ ] T005 [P] Add shared config loader (`backend/poller/src/config.ts`) for Convex URL/token, Gateway URL/token, Slack targets.

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T006 Implement Convex schema in `backend/convex/schema.ts` per `data-model.md` (include `agents.enabled`, `notifications.maxRetries`).
- [ ] T007 [P] Add shared error code types in `backend/convex/lib/errors.ts` and reuse in all functions.
- [ ] T008 Implement `activities.log` mutation + tests in `backend/convex/functions/activities.ts`.
- [ ] T009 Implement OpenClaw Gateway RPC client wrapper for `sessions_send` in `backend/poller/src/openclaw.ts` (timeout handling required; auth token handling documented).
- [ ] T010 Add Convex test harness setup under `backend/convex/tests/utils.ts`.

**Checkpoint**: Foundation complete; user stories can proceed.

---

## Phase 3: User Story 1 — Core Task Workflow (P1)

**Goal**: Create/assign/update tasks with real‑time visibility.

**Independent Test**: Create a task → assign agent → update status → activity feed updated.

### Tests (write first)

- [ ] T011 [P] [US1] Contract tests for `tasks.create` in `backend/convex/tests/tasks.create.test.ts`.
- [ ] T012 [P] [US1] Contract tests for `tasks.update` in `backend/convex/tests/tasks.update.test.ts`.
- [ ] T013 [P] [US1] Contract tests for `tasks.assign` in `backend/convex/tests/tasks.assign.test.ts`.
- [ ] T014 [P] [US1] UI test for task creation + status change in `frontend/tests/task-board.test.tsx`.

### Implementation

- [ ] T015 [US1] Implement `tasks.create/update/assign` in `backend/convex/functions/tasks.ts` with activity logging.
- [ ] T016 [US1] Implement task board UI in `frontend/src/components/TaskBoard.tsx` + task detail panel wiring.
- [ ] T017 [US1] Wire Convex queries/mutations in `frontend/src/services/convex.ts`.

---

## Phase 4: User Story 2 — Agent Posts Work via Convex (P1)

**Goal**: Agents post messages/documents to tasks; UI updates in real time.

**Independent Test**: Create message + document and verify UI + activity feed.

### Tests (write first)

- [ ] T018 [P] [US2] Contract tests for `messages.create` with auto‑subscribe in `backend/convex/tests/messages.create.test.ts`.
- [ ] T019 [P] [US2] Contract tests for `documents.create` in `backend/convex/tests/documents.create.test.ts`.
- [ ] T020 [P] [US2] UI test for comments + documents in `frontend/tests/task-detail.test.tsx`.

### Implementation

- [ ] T021 [US2] Implement `messages.create` in `backend/convex/functions/messages.ts` with auto‑subscribe + activity log.
- [ ] T022 [US2] Implement `documents.create` in `backend/convex/functions/documents.ts` with auto‑subscribe + activity log.
- [ ] T023 [US2] Implement task detail view (comments + docs) in `frontend/src/components/TaskDetail.tsx`.

---

## Phase 5: User Story 3 — Notification Poller (P1)

**Goal**: Deliver notifications to Slack via OpenClaw `sessions_send`, retry safely.

**Independent Test**: Undelivered notification → poller → Slack delivery → mark delivered.

### Tests (write first)

- [ ] T024 [P] [US3] Poller unit tests for delivery success + mark delivered in `backend/poller/tests/poller.success.test.ts`.
- [ ] T025 [P] [US3] Poller retry/backoff tests in `backend/poller/tests/poller.retry.test.ts`.
- [ ] T026 [P] [US3] Poller skip tests (agent.disabled, delivered=true) in `backend/poller/tests/poller.skip.test.ts`.

### Implementation

- [ ] T027 [US3] Implement notifications queries + markDelivered in `backend/convex/functions/notifications.ts`.
- [ ] T028 [US3] Implement poller loop in `backend/poller/src/index.ts` with sequential processing, backoff, maxRetries.
- [ ] T029 [US3] Integrate OpenClaw RPC client and Slack delivery targets in poller config.

---

## Phase 6: User Story 4 — Daily Standup (P2)

**Goal**: Aggregate daily activity and deliver standup to Slack.

**Independent Test**: Seed activities → generate standup → Slack summary output.

### Tests (write first)

- [ ] T030 [P] [US4] Contract test for `standups.generate` in `backend/convex/tests/standups.generate.test.ts`.

### Implementation

- [ ] T031 [US4] Implement `standups.generate` in `backend/convex/functions/standups.ts`.
- [ ] T032 [US4] Add standup runner in `backend/poller/src/standup.ts` (callable by cron).

---

## Phase 7: User Story 5 — Staged Agent Activation (P2)

**Goal**: Enable agents in waves without schema changes.

**Independent Test**: Toggle `agents.enabled` and observe poller behavior.

### Tests (write first)

- [ ] T033 [P] [US5] Contract tests for `agents.updateEnabled` in `backend/convex/tests/agents.updateEnabled.test.ts`.

### Implementation

- [ ] T034 [US5] Implement `agents.updateEnabled` in `backend/convex/functions/agents.ts`.
- [ ] T035 [US5] Add simple enable/disable control in `frontend/src/components/AgentCard.tsx` (optional admin toggle).

---

## Phase 8: User Story 6 — Thread Subscriptions (P3)

**Goal**: Auto‑subscribe on interaction and notify subscribers without @mention.

**Independent Test**: Comment/assign → subscription created → notification sent on next comment.

### Tests (write first)

- [ ] T036 [P] [US6] Contract tests for `subscriptions.subscribe/unsubscribe` in `backend/convex/tests/subscriptions.test.ts`.
- [ ] T037 [P] [US6] Integration test for auto‑subscribe behavior in `backend/convex/tests/subscriptions.auto.test.ts`.

### Implementation

- [ ] T038 [US6] Implement subscriptions functions in `backend/convex/functions/subscriptions.ts`.
- [ ] T039 [US6] Extend `messages.create` and `tasks.assign` to emit notifications to subscribers.

---

## Phase 9: Polish & Cross‑Cutting

- [ ] T040 Update `deployment-runbook.md` with finalized command paths/targets.
- [ ] T041 Run `quickstart.md` validation checklist and record results.
- [ ] T042 Verify Telegram framework remains disabled; do not test or enable (add a config guard check).

---

## Integration & Deployment Gates

- [ ] TG01 Integration Gate: Move to MacBook with local OpenClaw; run end-to-end Slack delivery + cron/heartbeat validation.
- [ ] TG02 Deployment Gate: After TG01 passes, deploy to VPS and run smoke tests only.

---

## Dependencies & Execution Order

- Phase 1 → Phase 2 (blocking)
- US1/US2/US3 depend on Phase 2.
- US4/US5/US6 depend on Phase 2, can run in parallel if needed.
- Phase 9 after all desired stories pass.
