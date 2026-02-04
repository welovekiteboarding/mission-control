import { useEffect, useState } from "react";
import { ActivityFeed } from "./components/ActivityFeed";
import { AgentCard } from "./components/AgentCard";
import { TaskBoard } from "./components/TaskBoard";
import { TaskDetail } from "./components/TaskDetail";
import { useAgents, useTasks } from "./services/convex";

export const App = () => {
  const tasks = useTasks();
  const agents = useAgents();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTaskId && tasks.length > 0) {
      setSelectedTaskId(tasks[0]?.id ?? null);
    }
  }, [selectedTaskId, tasks]);

  return (
    <div className="min-h-screen bg-midnight px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-aurora">
              Mission Control
            </p>
            <h1 className="text-3xl font-semibold text-white">
              OpenClaw Operations Console
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Real-time orchestration for multi-agent delivery.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-xs text-slate-300">
            Status: <span className="text-emerald-300">Live Sync</span>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[2.2fr_1fr]">
          <TaskBoard
            selectedTaskId={selectedTaskId}
            onSelectTask={setSelectedTaskId}
          />
          <div className="flex flex-col gap-6">
            {selectedTaskId ? (
              <TaskDetail
                taskId={selectedTaskId}
                onBack={() => setSelectedTaskId(null)}
              />
            ) : (
              <section className="flex h-full flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-400">
                Select a task to see mission details.
              </section>
            )}
            <ActivityFeed />
          </div>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Agents
              </p>
              <h2 className="text-xl font-semibold text-white">
                Activation Grid
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              {agents.filter((agent) => agent.enabled).length} active
            </span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {agents.length === 0 ? (
              <p className="text-xs text-slate-500">No agents online.</p>
            ) : (
              agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
