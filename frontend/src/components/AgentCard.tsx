import classNames from "classnames";
import { Agent, useMutation } from "../services/convex";

export type AgentCardProps = {
  agent: Agent;
};

export const AgentCard = ({ agent }: AgentCardProps) => {
  const toggleEnabled = useMutation("agents.toggleEnabled");
  return (
    <article className="rounded-2xl border border-white/10 bg-midnight/70 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white">{agent.name}</h4>
          <p className="text-sm text-white/60">{agent.role}</p>
        </div>
        <span
          className={classNames(
            "rounded-full px-3 py-1 text-xs",
            agent.status === "Working"
              ? "bg-ember/20 text-ember"
              : agent.status === "Idle"
              ? "bg-aurora/20 text-aurora"
              : "bg-white/10 text-white/50"
          )}
        >
          {agent.status}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <span className="text-white/50">Activation</span>
        <button
          type="button"
          onClick={() => toggleEnabled({ agentId: agent.id })}
          className={classNames(
            "rounded-full px-3 py-1 font-semibold transition",
            agent.enabled
              ? "bg-aurora/90 text-midnight"
              : "bg-white/10 text-white/60"
          )}
        >
          {agent.enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
    </article>
  );
};
