import { useState } from "react";
import {
  usePostDocument,
  usePostMessage,
  useTask,
  useTaskDocuments,
  useTaskMessages,
} from "../services/convex";
import type { DocumentType } from "../types";

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: "deliverable", label: "Deliverable" },
  { value: "research", label: "Research" },
  { value: "protocol", label: "Protocol" },
  { value: "other", label: "Other" },
];

type TaskDetailProps = {
  taskId: string;
  onBack: () => void;
};

export const TaskDetail = ({ taskId, onBack }: TaskDetailProps) => {
  const task = useTask(taskId);
  const messages = useTaskMessages(taskId);
  const documents = useTaskDocuments(taskId);
  const postMessage = usePostMessage();
  const postDocument = usePostDocument();
  const [comment, setComment] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [docContent, setDocContent] = useState("");
  const [docType, setDocType] = useState<DocumentType>("deliverable");

  if (!task) {
    return (
      <section className="flex h-full flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-slate-300">
        <p className="text-sm">Select a task to see mission detail.</p>
      </section>
    );
  }

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    await postMessage({ taskId, content: comment.trim() });
    setComment("");
  };

  const handlePostDocument = async () => {
    if (!docTitle.trim()) return;
    await postDocument({
      taskId,
      title: docTitle.trim(),
      content: docContent.trim(),
      type: docType,
    });
    setDocTitle("");
    setDocContent("");
    setDocType("deliverable");
  };

  return (
    <section className="flex h-full flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Task Detail
          </p>
          <h2 className="text-2xl font-semibold text-white">{task.title}</h2>
          <p className="mt-2 text-sm text-slate-300">{task.description}</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-aurora hover:text-aurora"
        >
          Back
        </button>
      </header>

      <div className="grid flex-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              Comments
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-500">No comments yet.</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{message.fromAgent}</span>
                      <span>{new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-200">
                      {message.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              Add Comment
            </label>
            <textarea
              className="mt-3 h-24 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              aria-label="New comment"
            />
            <button
              type="button"
              onClick={handlePostComment}
              className="mt-3 w-full rounded-xl bg-ember px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900"
            >
              Post Comment
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              Documents
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              {documents.length === 0 ? (
                <p className="text-xs text-slate-500">No documents yet.</p>
              ) : (
                documents.map((document) => (
                  <div
                    key={document.id}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-3"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-slate-200">
                        {document.title}
                      </span>
                      <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                        {document.type}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300">
                      {document.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              Add Document
            </label>
            <div className="mt-3 flex flex-col gap-3">
              <input
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100"
                value={docTitle}
                onChange={(event) => setDocTitle(event.target.value)}
                placeholder="Document title"
                aria-label="Document title"
              />
              <textarea
                className="h-24 resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100"
                value={docContent}
                onChange={(event) => setDocContent(event.target.value)}
                placeholder="Document content"
                aria-label="Document content"
              />
              <select
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100"
                value={docType}
                onChange={(event) =>
                  setDocType(event.target.value as DocumentType)
                }
                aria-label="Document type"
              >
                {DOCUMENT_TYPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handlePostDocument}
                className="rounded-xl bg-aurora px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
