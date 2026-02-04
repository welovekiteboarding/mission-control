import type { Agent } from "../types";

const STATUS_STYLES: Record<Agent["status"], string> = {
  idle: "text-slate-300",
  active: "text-glow",
  blocked: "text-pulse"
};

type AgentCardProps = {
  agent: Agent;
  onToggleEnabled: (agentId: string, enabled: boolean) => void;
};

export default function AgentCard({ agent, onToggleEnabled }: AgentCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-midnight/40 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{agent.name}</h4>
          <p className="text-xs text-slate-400">{agent.role}</p>
        </div>
        <span className={`text-xs font-semibold uppercase ${STATUS_STYLES[agent.status]}`}>
          {agent.status}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">Enabled</span>
        <label className="inline-flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={agent.enabled}
            onChange={(event) => onToggleEnabled(agent.id, event.target.checked)}
            aria-label={`Toggle ${agent.name}`}
          />
          <span>{agent.enabled ? "Active" : "Paused"}</span>
        </label>
      </div>
    </article>
  );
}
