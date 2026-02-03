 # Mission Control — Project Brief
 
 **Purpose**  
 Build a Mission Control layer that orchestrates multiple OpenClaw agents into a coordinated team with shared context, tasks, and notifications.
 
 **Scope**  
 Mission Control is in scope. OpenClaw itself is out of scope (used as the runtime).
 
 **Key Outcomes**  
 1. Shared coordination UI: React dashboard for tasks, comments, activity, and documents.  
 2. Notifications & delivery: A poller runs every 2 seconds to drain Convex notifications and deliver them via OpenClaw `sessions_send`.  
 3. Agent orchestration: Staged activation of agents (1 → 3 → 5 → 7 → 9 → 10) to safely scale to 10 agents.  
 4. Daily standup: Automatic summary delivered to the operator.  
 5. Channel support: Slack delivery first. Telegram integration scaffolded but disabled by default.
 
 **Architecture**  
 - Frontend: `frontend/` (React Mission Control UI)  
 - Backend: `backend/` (Convex + poller service)  
 - Runtime: `openclaw-upstream/` (OpenClaw gateway & sessions)  
 - Specs/Plans: `spec-kit/specs/001-mission-control/`
 
 **Constraints**  
 - Mirror the reference architecture from the Mission Control thread.  
 - TDD only, no guessing; document gaps explicitly.  
 - Support local dev and VPS deployments (OpenClaw gateway can be remote).
 
 **Success Criteria**  
 - Tasks and comments flow end-to-end.  
 - Notifications deliver reliably via OpenClaw sessions.  
 - Slack delivery verified against a real OpenClaw gateway.  
 - Standup summary delivered on schedule.  
