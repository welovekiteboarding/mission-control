import { useEffect, useMemo, useState } from "react";
import AgentCard from "./components/AgentCard";
import TaskBoard from "./components/TaskBoard";
import TaskDetail from "./components/TaskDetail";
import {
  useAgents,
  useAssignTask,
  useCreateDocument,
  useCreateMessage,
  useCreateTask,
  useDocuments,
  useMessages,
  useTasks,
  useUpdateAgentEnabled,
  useUpdateTask
} from "./services/convex";
import type { TaskStatus } from "./types";

export default function App() {
  const tasks = useTasks() ?? [];
  const agents = useAgents() ?? [];
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();

  useEffect(() => {
    if (!selectedTaskId && tasks.length > 0) {
      setSelectedTaskId(tasks[0].id);
    }
  }, [selectedTaskId, tasks]);

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId),
    [tasks, selectedTaskId]
  );

  const messages = useMessages(selectedTaskId) ?? [];
  const documents = useDocuments(selectedTaskId) ?? [];

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const assignTask = useAssignTask();
  const createMessage = useCreateMessage();
  const createDocument = useCreateDocument();
  const updateAgentEnabled = useUpdateAgentEnabled();

  return (
    <div className="min-h-screen px-6 py-8">
      <header className="mx-auto mb-8 max-w-7xl">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-title">Mission Control</p>
            <h1 className="text-3xl font-bold text-slate-100">
              Multi-agent orchestration dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Track task status, agent updates, and live deliverables with Convex-powered
              realtime sync.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-nebula/70 px-5 py-3 text-xs text-slate-300 shadow-glow">
            Poller cadence: 2s · Slack delivery active · Telegram disabled
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <TaskBoard
            tasks={tasks}
            agents={agents}
            selectedTaskId={selectedTaskId}
            onSelectTask={setSelectedTaskId}
            onCreateTask={(input) => createTask(input as never)}
            onUpdateTaskStatus={(taskId, status: TaskStatus) =>
              updateTask({ taskId, status } as never)
            }
            onAssignTask={(taskId, agentId) => assignTask({ taskId, agentId } as never)}
          />

          <TaskDetail
            task={selectedTask}
            agents={agents}
            messages={messages}
            documents={documents}
            onAddMessage={(input) => createMessage(input as never)}
            onAddDocument={(input) => createDocument(input as never)}
          />
        </div>

        <aside className="space-y-4">
          <div className="card">
            <p className="section-title">Agents</p>
            <div className="mt-4 space-y-3">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onToggleEnabled={(agentId, enabled) =>
                    updateAgentEnabled({ agentId, enabled } as never)
                  }
                />
              ))}
              {agents.length === 0 && (
                <p className="text-sm text-slate-500">No agents online.</p>
              )}
            </div>
          </div>
          <div className="card">
            <p className="section-title">Realtime status</p>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>Convex sync: active</p>
              <p>Task stream: {tasks.length} tasks</p>
              <p>Agents enabled: {agents.filter((agent) => agent.enabled).length}</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
