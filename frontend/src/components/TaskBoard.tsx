import { useMemo, useState } from "react";
import {
  useAgents,
  useAssignTask,
  useCreateTask,
  useTasks,
  useUpdateTaskStatus,
} from "../services/convex";
import type { TaskStatus } from "../types";

const STATUS_COLUMNS: { id: TaskStatus; label: string; description: string }[] = [
  {
    id: "inbox",
    label: "Inbox",
    description: "Fresh requests waiting on triage.",
  },
  {
    id: "assigned",
    label: "Assigned",
    description: "Agent confirmed and queued.",
  },
  {
    id: "in_progress",
    label: "In Progress",
    description: "Active execution in motion.",
  },
  {
    id: "review",
    label: "Review",
    description: "Awaiting operator check.",
  },
  {
    id: "done",
    label: "Done",
    description: "Mission delivered.",
  },
];

type TaskBoardProps = {
  selectedTaskId: string | null;
  onSelectTask: (taskId: string) => void;
};

export const TaskBoard = ({ selectedTaskId, onSelectTask }: TaskBoardProps) => {
  const tasks = useTasks();
  const agents = useAgents();
  const createTask = useCreateTask();
  const updateStatus = useUpdateTaskStatus();
  const assignTask = useAssignTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const taskMap = useMemo(() => {
    const map: Record<TaskStatus, typeof tasks> = {
      inbox: [],
      assigned: [],
      in_progress: [],
      review: [],
      done: [],
    };
    tasks.forEach((task) => map[task.status].push(task));
    return map;
  }, [tasks]);

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createTask({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <section className="flex h-full flex-col gap-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-glow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aurora">
              Mission Board
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Orchestration Dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Shape tasks, lock assignees, and move work through the pipeline.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              New Task
            </label>
            <input
              className="w-64 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Task title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-label="Task title"
            />
            <textarea
              className="h-20 w-64 resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              placeholder="Task description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              aria-label="Task description"
            />
            <button
              className="rounded-xl bg-aurora px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
              type="button"
              onClick={handleCreate}
            >
              Create Task
            </button>
          </div>
        </div>
      </header>

      <div className="grid flex-1 gap-4 lg:grid-cols-5">
        {STATUS_COLUMNS.map((column) => (
          <div
            key={column.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4"
          >
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">
                {column.label}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                {column.description}
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {taskMap[column.id].length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-500">
                  No tasks yet.
                </div>
              ) : (
                taskMap[column.id].map((task) => (
                  <article
                    key={task.id}
                    className={`rounded-2xl border p-4 transition hover:border-aurora hover:shadow-glow ${
                      selectedTaskId === task.id
                        ? "border-aurora bg-slate-950/80"
                        : "border-slate-800 bg-slate-950/60"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectTask(task.id)}
                      className="text-left"
                    >
                      <h4 className="text-sm font-semibold text-white">
                        {task.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-400">
                        {task.description}
                      </p>
                    </button>
                    <div className="mt-4 flex flex-col gap-3 text-xs text-slate-300">
                      <label className="flex flex-col gap-2">
                        Status
                        <select
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-xs"
                          value={task.status}
                          onChange={(event) =>
                            updateStatus({
                              taskId: task.id,
                              status: event.target.value as TaskStatus,
                            })
                          }
                          aria-label={`Status for ${task.title}`}
                        >
                          {STATUS_COLUMNS.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-2">
                        Assign
                        <select
                          className="rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-1 text-xs"
                          value={task.assigneeIds[0] ?? ""}
                          onChange={(event) => {
                            if (!event.target.value) return;
                            assignTask({
                              taskId: task.id,
                              assigneeId: event.target.value,
                            });
                          }}
                          aria-label={`Assign for ${task.title}`}
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
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
