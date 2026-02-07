import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskDetail } from "../src/components/TaskDetail";
import { ConvexProvider } from "../src/services/convex";

const baseTask = {
  id: "task-1",
  title: "Draft standup summary",
  description: "Aggregate agent activity",
  status: "Inbox" as const,
  assignees: [],
  createdAt: Date.now()
};

describe("TaskDetail", () => {
  it("adds comments and documents", async () => {
    const user = userEvent.setup();
    render(
      <ConvexProvider initialData={{ tasks: [baseTask] }}>
        <TaskDetail taskId="task-1" />
      </ConvexProvider>
    );

    await user.type(
      screen.getByPlaceholderText(/share progress update/i),
      "Posted the draft summary."
    );
    await user.click(screen.getByRole("button", { name: /add comment/i }));

    expect(screen.getByText(/posted the draft summary/i)).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText(/document title/i), "Summary v1");
    await user.type(
      screen.getByPlaceholderText(/document summary/i),
      "Highlights and action items."
    );
    await user.click(screen.getByRole("button", { name: /add document/i }));

    expect(screen.getByText("Summary v1")).toBeInTheDocument();
    expect(screen.getByText(/highlights and action items/i)).toBeInTheDocument();
  });
});
