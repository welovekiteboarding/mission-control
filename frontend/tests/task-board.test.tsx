import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskBoard } from "../src/components/TaskBoard";
import type { Agent, Task } from "../src/types";

const createTask = vi.fn();
const updateTaskStatus = vi.fn();
const assignTask = vi.fn();

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Draft the mission brief",
    description: "Summarize the core outcome for the squad.",
    status: "inbox",
    assigneeIds: [],
  },
];

const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Shuri",
    role: "Product Analyst",
    status: "idle",
    enabled: true,
  },
];

vi.mock("../src/services/convex", () => ({
  useTasks: () => mockTasks,
  useAgents: () => mockAgents,
  useCreateTask: () => createTask,
  useUpdateTaskStatus: () => updateTaskStatus,
  useAssignTask: () => assignTask,
}));

describe("TaskBoard", () => {
  it("creates a new task and updates status", async () => {
    const user = userEvent.setup();
    render(<TaskBoard onSelectTask={vi.fn()} selectedTaskId={null} />);

    await user.type(screen.getByLabelText(/task title/i), "Map the launch risks");
    await user.type(
      screen.getByLabelText(/task description/i),
      "Document risks and mitigations.",
    );
    await user.click(screen.getByRole("button", { name: /create task/i }));

    expect(createTask).toHaveBeenCalledWith({
      title: "Map the launch risks",
      description: "Document risks and mitigations.",
    });

    await user.selectOptions(
      screen.getByLabelText(/status for draft the mission brief/i),
      "in_progress",
    );

    expect(updateTaskStatus).toHaveBeenCalledWith({
      taskId: "task-1",
      status: "in_progress",
    });
  });
});
