import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskDetail } from "../src/components/TaskDetail";
import type { Document, Message, Task } from "../src/types";

const postMessage = vi.fn();
const postDocument = vi.fn();

const mockTask: Task = {
  id: "task-1",
  title: "Launch readiness",
  description: "Ensure the runbook is ready.",
  status: "in_progress",
  assigneeIds: [],
};

const mockMessages: Message[] = [
  {
    id: "msg-1",
    taskId: "task-1",
    fromAgent: "Fury",
    content: "Drafted the initial runbook outline.",
    createdAt: "2026-02-02T10:00:00Z",
  },
];

const mockDocuments: Document[] = [
  {
    id: "doc-1",
    taskId: "task-1",
    title: "Runbook v1",
    content: "## Launch checklist\n- Step 1",
    type: "deliverable",
    createdAt: "2026-02-02T11:00:00Z",
  },
];

vi.mock("../src/services/convex", () => ({
  useTask: () => mockTask,
  useTaskMessages: () => mockMessages,
  useTaskDocuments: () => mockDocuments,
  usePostMessage: () => postMessage,
  usePostDocument: () => postDocument,
}));

describe("TaskDetail", () => {
  it("renders comments/documents and submits new entries", async () => {
    const user = userEvent.setup();
    render(<TaskDetail taskId="task-1" onBack={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: /launch readiness/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/drafted the initial runbook outline/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/runbook v1/i)).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/new comment/i),
      "Added the checklist items.",
    );
    await user.click(screen.getByRole("button", { name: /post comment/i }));

    expect(postMessage).toHaveBeenCalledWith({
      taskId: "task-1",
      content: "Added the checklist items.",
    });

    await user.type(screen.getByLabelText(/document title/i), "Runbook v2");
    await user.type(
      screen.getByLabelText(/document content/i),
      "## Updates\n- Added validation step",
    );
    await user.selectOptions(
      screen.getByLabelText(/document type/i),
      "research",
    );
    await user.click(screen.getByRole("button", { name: /add document/i }));

    expect(postDocument).toHaveBeenCalledWith({
      taskId: "task-1",
      title: "Runbook v2",
      content: "## Updates\n- Added validation step",
      type: "research",
    });
  });
});
