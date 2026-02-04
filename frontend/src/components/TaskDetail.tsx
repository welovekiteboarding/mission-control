import { useMemo, useState } from "react";
import type { Agent, Document, Message, Task } from "../types";

const DOCUMENT_TYPES = ["deliverable", "research", "protocol", "other"] as const;

type TaskDetailProps = {
  task?: Task;
  agents: Agent[];
  messages: Message[];
  documents: Document[];
  onAddMessage: (input: { taskId: string; fromAgentId: string; content: string }) => void;
  onAddDocument: (input: {
    taskId: string;
    title: string;
    type: "deliverable" | "research" | "protocol" | "other";
    content: string;
  }) => void;
};

export default function TaskDetail({
  task,
  agents,
  messages,
  documents,
  onAddMessage,
  onAddDocument
}: TaskDetailProps) {
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState<
    "deliverable" | "research" | "protocol" | "other"
  >("deliverable");
  const [documentBody, setDocumentBody] = useState("");

  const authorOptions = useMemo(() => agents.filter((agent) => agent.enabled), [agents]);

  if (!task) {
    return (
      <section className="card h-full">
        <p className="section-title">Task detail</p>
        <p className="mt-4 text-sm text-slate-400">
          Select a task to view live activity, comments, and documents.
        </p>
      </section>
    );
  }

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentAuthor || !commentBody.trim()) {
      return;
    }
    onAddMessage({ taskId: task.id, fromAgentId: commentAuthor, content: commentBody.trim() });
    setCommentBody("");
  };

  const handleAddDocument = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!documentTitle.trim() || !documentBody.trim()) {
      return;
    }
    onAddDocument({
      taskId: task.id,
      title: documentTitle.trim(),
      type: documentType,
      content: documentBody.trim()
    });
    setDocumentTitle("");
    setDocumentBody("");
  };

  return (
    <section className="space-y-6">
      <div className="card">
        <p className="section-title">Task detail</p>
        <h2 className="mt-4 text-2xl font-semibold">{task.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{task.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {task.assigneeIds.map((assigneeId) => {
            const agent = agents.find((item) => item.id === assigneeId);
            return (
              <span key={assigneeId} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                {agent ? agent.name : "Unknown"}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Comments</h3>
            <span className="text-xs text-slate-400">{messages.length} total</span>
          </div>
          <div className="space-y-3">
            {messages.map((message) => {
              const agent = agents.find((item) => item.id === message.fromAgentId);
              return (
                <div key={message.id} className="rounded-xl border border-white/10 p-3">
                  <p className="text-sm text-slate-400">
                    {agent ? agent.name : "Unknown"} • {message.createdAt}
                  </p>
                  <p className="mt-2 text-sm">{message.content}</p>
                </div>
              );
            })}
            {messages.length === 0 && (
              <p className="text-sm text-slate-500">No comments yet.</p>
            )}
          </div>
          <form className="grid gap-3" onSubmit={handleAddComment}>
            <label className="text-xs text-slate-400">
              Author
              <select
                value={commentAuthor}
                onChange={(event) => setCommentAuthor(event.target.value)}
              >
                <option value="">Select agent</option>
                {authorOptions.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-slate-400">
              Comment
              <textarea
                rows={3}
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
                placeholder="Share progress update"
              />
            </label>
            <button type="submit" className="bg-glow text-slate-900">
              Post comment
            </button>
          </form>
        </div>

        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Documents</h3>
            <span className="text-xs text-slate-400">{documents.length} files</span>
          </div>
          <div className="space-y-3">
            {documents.map((document) => (
              <div key={document.id} className="rounded-xl border border-white/10 p-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{document.title}</h4>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {document.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{document.content}</p>
              </div>
            ))}
            {documents.length === 0 && (
              <p className="text-sm text-slate-500">No documents yet.</p>
            )}
          </div>
          <form className="grid gap-3" onSubmit={handleAddDocument}>
            <label className="text-xs text-slate-400">
              Title
              <input
                value={documentTitle}
                onChange={(event) => setDocumentTitle(event.target.value)}
                placeholder="Weekly summary"
              />
            </label>
            <label className="text-xs text-slate-400">
              Type
              <select
                value={documentType}
                onChange={(event) =>
                  setDocumentType(event.target.value as typeof DOCUMENT_TYPES[number])
                }
              >
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs text-slate-400">
              Content
              <textarea
                rows={3}
                value={documentBody}
                onChange={(event) => setDocumentBody(event.target.value)}
                placeholder="Document details"
              />
            </label>
            <button type="submit" className="bg-pulse text-slate-900">
              Upload document
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
