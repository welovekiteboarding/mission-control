# Mission Control Constitution

## Purpose
Build Mission Control exactly as specified in the reference post and OpenClaw documentation, using Spec‑Driven Development and strict TDD. The system must support 10 agents, but operational rollout is staged (1 → 3 → 5 → 7 → 9 → 10) without changing the underlying framework.

## Non‑Negotiables

1. **No Guessing**
   - Every implementation decision must be grounded in documented sources.
   - If details are missing, record a **GAP** with sources checked and what is unknown.
   - Only then make an explicit, labeled educated guess with rationale.

2. **TDD Always**
   - Red → Green → Refactor for every behavior.
   - Tests must exist before production code for each feature slice.
   - No implementation work without failing tests that define expected behavior.

3. **Mirror the Post Framework**
   - Convex backend, React frontend, OpenClaw sessions, cron heartbeats, 2‑second notification poller.
   - Deviations require explicit justification tied to documented evidence.

4. **Spec‑Driven Artifacts Are Source of Truth**
   - PRD/spec, plan, tasks, data model, and contracts must stay consistent.
   - Update specs first, then implementation.

## Quality Standards

- Deterministic, testable behavior for every API and UI surface.
- Clear operational safety for staged agent activation.
- No hidden coupling: all agent interactions with Mission Control are explicit (Convex functions + notification daemon + OpenClaw messaging).

## Research Policy

- Primary sources: OpenClaw repo + OpenClaw docs.
- Each spec must include a **Research & Gaps** section with citations and resolutions.
- If a gap remains, the educated guess must be isolated, reversible, and tracked.
