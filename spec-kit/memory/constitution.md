# Mission Control Constitution

## Core Principles

### I. Spec-Driven, TDD-First (Non-Negotiable)
All development follows Spec-Driven Development. Tests are written first and must fail before implementation. No implementation without an explicit spec/plan/task reference.

### II. No Guessing, Document Gaps
All decisions must be grounded in the Mission Control spec, OpenClaw docs, or the reference thread. If data is missing, record a GAP in research and proceed only when clarified.

### III. Thin Coordination Layer Only
Mission Control is a coordination layer. Do not re-implement OpenClaw runtime features. Integrate only via documented session tools (e.g., `sessions_send`).

### IV. Mirror Reference Architecture
Mirror the reference architecture from the Mission Control thread: Convex + React + OpenClaw cron/heartbeat + 2-second notification poller.

### V. Channel Delivery Constraints
Slack delivery must work first. Telegram must remain disabled until explicitly requested after completion.

## Additional Constraints

- Staged agent activation must follow the 1 -> 3 -> 5 -> 7 -> 9 -> 10 rollout.
- OpenClaw gateway may run remotely (VPS); local dev must support remote gateway access.
- Any schema or contract changes must update the relevant spec-kit contracts and tests.

## Development Workflow

- Every change must reference a task ID from `spec-kit/specs/001-mission-control/tasks.md`.
- Tests must be authored before implementation for each story.
- If a task cannot be completed due to missing info, create or update a GAP entry and stop.

## Governance
The constitution supersedes all other guidance. Amendments require explicit updates to this file and a note in the relevant spec/plan/research docs.

All reviews must verify compliance with these principles. Complexity must be justified against the spec and plan.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-02-02
