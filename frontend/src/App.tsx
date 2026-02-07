import { useState } from "react";
import { ActivityFeed } from "./components/ActivityFeed";
import { AgentCard } from "./components/AgentCard";
import { TaskBoard } from "./components/TaskBoard";
import { TaskDetail } from "./components/TaskDetail";
import { Agent, useQuery } from "./services/convex";

const App = () => {
  const agents = useQuery("agents.list") as Agent[];
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  return (
    <div className="min-h-screen px-6 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-title">OpenClaw</p>
          <h1 className="text-3xl font-bold">Mission Control Dashboard</h1>
        </div>
        <div className="rounded-full border border-white/10 bg-midnight/70 px-4 py-2 text-xs text-white/60">
          Convex Realtime · 10 Agents
        </div>
      </header>

      <main className="grid gap-6 xl:grid-cols-[2.2fr_1fr]">
        <div className="space-y-6">
          <TaskBoard
            selectedTaskId={selectedTaskId}
            onSelectTask={(taskId) => setSelectedTaskId(taskId)}
          />
          <TaskDetail taskId={selectedTaskId} />
        </div>
        <aside className="space-y-6">
          <ActivityFeed />
          <section className="glass-panel p-6 space-y-4">
            <div>
              <p className="section-title">Agents</p>
              <h3 className="text-xl font-semibold">Roster</h3>
            </div>
            <div className="space-y-3">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default App;
