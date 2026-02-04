import { useUpdateAgentEnabled } from "../services/convex";
import type { Agent } from "../types";

type AgentCardProps = {
  agent: Agent;
};

export const AgentCard = ({ agent }: AgentCardProps) => {
  const updateEnabled = useUpdateAgentEnabled();

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div>
        <p className="text-sm font-semibold text-white">{agent.name}</p>
        <p className="text-xs text-slate-400">{agent.role}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
          {agent.status}
        </p>
      </div>
      <button
        type="button"
        onClick={() =>
          updateEnabled({ agentId: agent.id, enabled: !agent.enabled })
        }
        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
          agent.enabled
            ? "bg-emerald-400/20 text-emerald-300"
            : "bg-rose-400/20 text-rose-300"
        }`}
      >
        {agent.enabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
};
