import { useMemo, useState } from "react";
import type { Agent, Task, TaskStatus } from "../types";

const STATUSES: { key: TaskStatus; label: string }[] = [
  { key: "inbox", label: "Inbox" },
  { key: "assigned", label: "Assigned" },
  { key: "in_progress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" }
];

type TaskBoardProps = {
  tasks: Task[];
  agents: Agent[];
  selectedTaskId?: string;
  onSelectTask: (taskId: string) => void;
  onCreateTask: (input: { title: string; description: string }) => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onAssignTask: (taskId: string, agentId: string) => void;
};

export default function TaskBoard({
  tasks,
  agents,
  selectedTaskId,
  onSelectTask,
  onCreateTask,
  onUpdateTaskStatus,
  onAssignTask
}: TaskBoardProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const tasksByStatus = useMemo(() => {
    return STATUSES.reduce<Record<TaskStatus, Task[]>>((acc, status) => {
      acc[status.key] = tasks.filter((task) => task.status === status.key);
      return acc;
    }, {
      inbox: [],
      assigned: [],
      in_progress: [],
      review: [],
      done: []
    });
  }, [tasks]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    onCreateTask({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <section className="space-y-6">
      <div className="card">
        <p className="section-title">Create Task</p>
        <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
          <label className="text-sm text-slate-300">
            Title
            <input
              name="title"
              placeholder="Mission briefing"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className="text-sm text-slate-300">
            Description
            <textarea
              name="description"
              placeholder="Describe the mission objective"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <button type="submit" className="bg-glow text-slate-900">
            Dispatch task
          </button>
        </form>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        {STATUSES.map((status) => (
          <div key={status.key} className="card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{status.label}</h3>
              <span className="text-xs text-slate-400">
                {tasksByStatus[status.key].length} tasks
              </span>
            </div>
            <div className="space-y-3">
              {tasksByStatus[status.key].map((task) => {
                const isSelected = task.id === selectedTaskId;
                return (
                  <article
                    key={task.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectTask(task.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onSelectTask(task.id);
                      }
                    }}
                    className={`rounded-xl border border-white/10 p-4 transition hover:border-glow hover:shadow-glow ${
                      isSelected ? "bg-aurora shadow-glow" : "bg-midnight/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{task.title}</h4>
                      <select
                        aria-label="Status"
                        data-testid={`status-select-${task.id}`}
                        value={task.status}
                        onChange={(event) =>
                          onUpdateTaskStatus(task.id, event.target.value as TaskStatus)
                        }
                      >
                        {STATUSES.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{task.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {task.assigneeIds.length === 0 ? (
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-400">
                          Unassigned
                        </span>
                      ) : (
                        task.assigneeIds.map((assigneeId) => {
                          const agent = agents.find((item) => item.id === assigneeId);
                          return (
                            <span
                              key={assigneeId}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs"
                            >
                              {agent ? agent.name : "Unknown"}
                            </span>
                          );
                        })
                      )}
                    </div>
                    <div className="mt-4">
                      <label className="text-xs text-slate-400">
                        Assign agent
                        <select
                          value=""
                          onChange={(event) => {
                            if (event.target.value) {
                              onAssignTask(task.id, event.target.value);
                            }
                          }}
                        >
                          <option value="">Select agent</option>
                          {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>
                              {agent.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </article>
                );
              })}
              {tasksByStatus[status.key].length === 0 && (
                <p className="text-sm text-slate-500">No tasks yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
