import classNames from "classnames";
import { useMemo, useState } from "react";
import { Task, TaskStatus, useMutation, useQuery } from "../services/convex";

const statuses: TaskStatus[] = ["Inbox", "In Progress", "Review", "Done"];

const statusStyles: Record<TaskStatus, string> = {
  Inbox: "border-aurora/40 text-aurora",
  "In Progress": "border-ember/60 text-ember",
  Review: "border-flare/60 text-flare",
  Done: "border-emerald-400/60 text-emerald-300"
};

export type TaskBoardProps = {
  selectedTaskId?: string | null;
  onSelectTask?: (taskId: string) => void;
};

export const TaskBoard = ({ selectedTaskId, onSelectTask }: TaskBoardProps) => {
  const tasks = useQuery("tasks.list") as Task[];
  const agents = useQuery("agents.list");
  const createTask = useMutation("tasks.create");
  const updateStatus = useMutation("tasks.updateStatus");
  const assignTask = useMutation("tasks.assign");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const tasksByStatus = useMemo(() => {
    return statuses.reduce((acc, status) => {
      acc[status] = tasks.filter((task) => task.status === status);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  }, [tasks]);

  const handleCreateTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    createTask({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <section className="glass-panel p-6 space-y-6">
      <div>
        <p className="section-title">Mission Tasks</p>
        <h2 className="text-2xl font-semibold">Task Board</h2>
      </div>

      <form
        onSubmit={handleCreateTask}
        className="grid gap-3 md:grid-cols-[2fr_3fr_auto] items-end"
      >
        <label className="text-sm text-white/70">
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Calibrate OpenClaw heartbeat"
            className="mt-1 w-full rounded-xl border border-white/10 bg-midnight/60 px-3 py-2 text-white focus:border-aurora focus:outline-none"
          />
        </label>
        <label className="text-sm text-white/70">
          Description
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Define the cron schedule for idle agents"
            className="mt-1 w-full rounded-xl border border-white/10 bg-midnight/60 px-3 py-2 text-white focus:border-aurora focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="h-11 rounded-xl bg-aurora/90 px-5 font-semibold text-midnight shadow-glow transition hover:bg-aurora"
        >
          Create Task
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-4">
        {statuses.map((status) => (
          <div
            key={status}
            data-testid={`column-${status.toLowerCase().replace(" ", "-")}`}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
                {status}
              </h3>
              <span className="text-xs text-white/40">
                {tasksByStatus[status]?.length ?? 0}
              </span>
            </div>
            <div className="space-y-3">
              {tasksByStatus[status]?.map((task) => {
                const assignees = task.assignees
                  .map((id) => agents.find((agent) => agent.id === id)?.name)
                  .filter(Boolean);
                return (
                  <article
                    key={task.id}
                    className={classNames(
                      "rounded-2xl border bg-midnight/60 p-4 transition hover:border-aurora/40",
                      statusStyles[status],
                      selectedTaskId === task.id ? "shadow-flare" : ""
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectTask?.(task.id)}
                      className="text-left"
                    >
                      <h4 className="text-lg font-semibold text-white">
                        {task.title}
                      </h4>
                      <p className="mt-1 text-sm text-white/60">
                        {task.description || "No description yet."}
                      </p>
                    </button>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {assignees.length > 0 ? (
                        assignees.map((name) => (
                          <span
                            key={name}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70"
                          >
                            {name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-white/40">
                          Unassigned
                        </span>
                      )}
                    </div>
                    <div className="mt-4 grid gap-2">
                      <label className="text-xs text-white/50">
                        Status
                        <select
                          value={task.status}
                          onChange={(event) =>
                            updateStatus({
                              taskId: task.id,
                              status: event.target.value as TaskStatus
                            })
                          }
                          className="mt-1 w-full rounded-lg border border-white/10 bg-midnight/80 px-2 py-1 text-sm text-white"
                        >
                          {statuses.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="text-xs text-white/50">
                        Assign agent
                        <select
                          onChange={(event) => {
                            if (event.target.value) {
                              assignTask({
                                taskId: task.id,
                                agentId: event.target.value
                              });
                            }
                          }}
                          className="mt-1 w-full rounded-lg border border-white/10 bg-midnight/80 px-2 py-1 text-sm text-white"
                          value=""
                        >
                          <option value="">Select agent</option>
                          {agents.map((agent) => (
                            <option key={agent.id} value={agent.id}>
                              {agent.name} · {agent.role}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
