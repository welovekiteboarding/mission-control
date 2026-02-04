import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import TaskDetail from "../src/components/TaskDetail";
import type { Agent, Document, Message, Task } from "../src/types";

describe("TaskDetail", () => {
  const agents: Agent[] = [
    {
      id: "agent-1",
      name: "Okoye",
      role: "Operations Lead",
      status: "active",
      enabled: true
    }
  ];

  const task: Task = {
    id: "task-1",
    title: "Investigate signal",
    description: "Analyze incoming telemetry",
    status: "in_progress",
    assigneeIds: ["agent-1"]
  };

  const messages: Message[] = [
    {
      id: "message-1",
      taskId: "task-1",
      fromAgentId: "agent-1",
      content: "Signal decoded, awaiting review.",
      createdAt: "09:12"
    }
  ];

  const documents: Document[] = [
    {
      id: "doc-1",
      taskId: "task-1",
      title: "Signal report",
      content: "Findings and next steps.",
      type: "research"
    }
  ];

  it("renders comments and documents", () => {
    render(
      <TaskDetail
        task={task}
        agents={agents}
        messages={messages}
        documents={documents}
        onAddMessage={vi.fn()}
        onAddDocument={vi.fn()}
      />
    );

    expect(screen.getByText(/signal decoded/i)).toBeInTheDocument();
    expect(screen.getByText(/signal report/i)).toBeInTheDocument();
  });

  it("submits new comments and documents", async () => {
    const user = userEvent.setup();
    const handleAddMessage = vi.fn();
    const handleAddDocument = vi.fn();

    render(
      <TaskDetail
        task={task}
        agents={agents}
        messages={[]}
        documents={[]}
        onAddMessage={handleAddMessage}
        onAddDocument={handleAddDocument}
      />
    );

    await act(async () => {
      await user.selectOptions(screen.getByLabelText(/author/i), "agent-1");
      await user.type(screen.getByLabelText(/comment/i), "All clear.");
      await user.click(screen.getByRole("button", { name: /post comment/i }));
    });

    expect(handleAddMessage).toHaveBeenCalledWith({
      taskId: "task-1",
      fromAgentId: "agent-1",
      content: "All clear."
    });

    await act(async () => {
      await user.type(screen.getByLabelText(/title/i), "Final report");
      await user.selectOptions(screen.getByLabelText(/type/i), "deliverable");
      await user.type(screen.getByLabelText(/content/i), "Summary ready.");
      await user.click(screen.getByRole("button", { name: /upload document/i }));
    });

    expect(handleAddDocument).toHaveBeenCalledWith({
      taskId: "task-1",
      title: "Final report",
      type: "deliverable",
      content: "Summary ready."
    });
  });
});
