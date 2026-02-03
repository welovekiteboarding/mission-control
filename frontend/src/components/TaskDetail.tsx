import { useMemo, useState } from "react";
import { Document, Message, Task, useMutation, useQuery } from "../services/convex";

export type TaskDetailProps = {
  taskId?: string | null;
};

export const TaskDetail = ({ taskId }: TaskDetailProps) => {
  const task = useQuery("tasks.byId", { taskId }) as Task | null;
  const agents = useQuery("agents.list");
  const messages = useQuery("messages.byTask", { taskId }) as Message[];
  const documents = useQuery("documents.byTask", { taskId }) as Document[];

  const createMessage = useMutation("messages.create");
  const createDocument = useMutation("documents.create");

  const [comment, setComment] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(agents[0]?.id ?? "");
  const [docTitle, setDocTitle] = useState("");
  const [docContent, setDocContent] = useState("");

  const assigneeNames = useMemo(() => {
    if (!task) return [];
    return task.assignees
      .map((id) => agents.find((agent) => agent.id === id)?.name)
      .filter(Boolean);
  }, [task, agents]);

  if (!task) {
    return (
      <section className="glass-panel p-6 h-full flex flex-col justify-center items-center text-center">
        <p className="section-title">Task Detail</p>
        <h3 className="text-xl font-semibold">Select a task to inspect</h3>
        <p className="mt-2 text-sm text-white/60">
          Choose a task from the board to see comments, documents, and telemetry.
        </p>
      </section>
    );
  }

  return (
    <section className="glass-panel p-6 space-y-6">
      <header className="space-y-2">
        <p className="section-title">Task Detail</p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white">{task.title}</h3>
            <p className="text-sm text-white/60">{task.description}</p>
          </div>
          <span className="rounded-full border border-aurora/40 px-3 py-1 text-xs text-aurora">
            {task.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/60">
          <span>Assignees:</span>
          {assigneeNames.length > 0 ? (
            assigneeNames.map((name) => (
              <span key={name} className="rounded-full border border-white/10 px-2 py-1">
                {name}
              </span>
            ))
          ) : (
            <span>None</span>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <h4 className="text-lg font-semibold">Comments</h4>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!comment.trim() || !selectedAgent) {
                return;
              }
              createMessage({
                taskId: task.id,
                authorId: selectedAgent,
                content: comment.trim()
              });
              setComment("");
            }}
            className="space-y-2"
          >
            <select
              value={selectedAgent}
              onChange={(event) => setSelectedAgent(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
            >
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} · {agent.role}
                </option>
              ))}
            </select>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Share progress update..."
              className="min-h-[100px] w-full rounded-lg border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-aurora/90 px-4 py-2 text-sm font-semibold text-midnight shadow-glow"
            >
              Add Comment
            </button>
          </form>
          <div className="space-y-3">
            {messages.length === 0 ? (
              <p className="text-sm text-white/40">No comments yet.</p>
            ) : (
              messages.map((message) => (
                <article
                  key={message.id}
                  className="rounded-xl border border-white/10 bg-midnight/70 p-3"
                >
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{message.authorName}</span>
                    <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{message.content}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h4 className="text-lg font-semibold">Documents</h4>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!docTitle.trim() || !docContent.trim()) {
                return;
              }
              createDocument({
                taskId: task.id,
                title: docTitle.trim(),
                content: docContent.trim()
              });
              setDocTitle("");
              setDocContent("");
            }}
            className="space-y-2"
          >
            <input
              value={docTitle}
              onChange={(event) => setDocTitle(event.target.value)}
              placeholder="Document title"
              className="w-full rounded-lg border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
            />
            <textarea
              value={docContent}
              onChange={(event) => setDocContent(event.target.value)}
              placeholder="Document summary or markdown..."
              className="min-h-[100px] w-full rounded-lg border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
            />
            <button
              type="submit"
              className="rounded-xl bg-flare/90 px-4 py-2 text-sm font-semibold text-midnight shadow-flare"
            >
              Add Document
            </button>
          </form>
          <div className="space-y-3">
            {documents.length === 0 ? (
              <p className="text-sm text-white/40">No documents yet.</p>
            ) : (
              documents.map((document) => (
                <article
                  key={document.id}
                  className="rounded-xl border border-white/10 bg-midnight/70 p-3"
                >
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{document.title}</span>
                    <span>{new Date(document.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{document.content}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
