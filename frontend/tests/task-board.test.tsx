import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import TaskBoard from "../src/components/TaskBoard";
import type { Agent, Task } from "../src/types";

describe("TaskBoard", () => {
  const agents: Agent[] = [
    {
      id: "agent-1",
      name: "Shuri",
      role: "Product Analyst",
      status: "active",
      enabled: true
    }
  ];

  const tasks: Task[] = [
    {
      id: "task-1",
      title: "Draft roadmap",
      description: "Outline Q1 objectives",
      status: "inbox",
      assigneeIds: []
    }
  ];

  it("creates a task and updates status", async () => {
    const user = userEvent.setup();
    const handleCreateTask = vi.fn();
    const handleUpdateStatus = vi.fn();
    const handleAssignTask = vi.fn();

    render(
      <TaskBoard
        tasks={tasks}
        agents={agents}
        selectedTaskId={tasks[0].id}
        onSelectTask={vi.fn()}
        onCreateTask={handleCreateTask}
        onUpdateTaskStatus={handleUpdateStatus}
        onAssignTask={handleAssignTask}
      />
    );

    await act(async () => {
      await user.type(screen.getByLabelText(/title/i), "New mission");
      await user.type(screen.getByLabelText(/description/i), "Investigate anomaly");
      await user.click(screen.getByRole("button", { name: /dispatch task/i }));
    });

    expect(handleCreateTask).toHaveBeenCalledWith({
      title: "New mission",
      description: "Investigate anomaly"
    });

    await act(async () => {
      await user.selectOptions(
        screen.getByTestId("status-select-task-1"),
        "in_progress"
      );
    });

    expect(handleUpdateStatus).toHaveBeenCalledWith("task-1", "in_progress");
  });
});
