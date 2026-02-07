import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent } from "./utils";

const createTask = functionRef("functions/tasks:create");

describe("tasks.create", () => {
  it("creates a task and logs activity", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { name: "Okoye" });

    const { taskId } = await t.mutation(createTask, {
      title: "Draft brief",
      description: "Draft the brief",
      actorId: agentId
    });

    const task = await t.run((ctx) => ctx.db.get(taskId));
    expect(task).not.toBeNull();
    expect(task?.status).toBe("inbox");
    expect(task?.assigneeIds).toHaveLength(0);

    const activities = await t.run((ctx) => ctx.db.query("activities").collect());
    expect(activities).toHaveLength(1);
    expect(activities[0]?.type).toBe("task_created");
  });
});
