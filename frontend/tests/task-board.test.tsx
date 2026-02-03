import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskBoard } from "../src/components/TaskBoard";
import { ConvexProvider } from "../src/services/convex";

describe("TaskBoard", () => {
  it("creates a task and updates status", async () => {
    const user = userEvent.setup();
    render(
      <ConvexProvider>
        <TaskBoard />
      </ConvexProvider>
    );

    await user.type(screen.getByLabelText(/title/i), "Wire Slack delivery");
    await user.type(
      screen.getByLabelText(/description/i),
      "Send notifications through OpenClaw"
    );
    await user.click(screen.getByRole("button", { name: /create task/i }));

    const inboxColumn = screen.getByTestId("column-inbox");
    expect(within(inboxColumn).getByText("Wire Slack delivery")).toBeInTheDocument();

    const statusSelect = within(inboxColumn).getByLabelText(/status/i);
    await user.selectOptions(statusSelect, "In Progress");

    const inProgressColumn = screen.getByTestId("column-in-progress");
    expect(
      within(inProgressColumn).getByText("Wire Slack delivery")
    ).toBeInTheDocument();
  });
});
