import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const updateTask = functionRef("functions/tasks:update");

describe("tasks.update", () => {
  it("updates a task and logs activity", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { name: "Fury" });
    const taskId = await seedTask(t);

    await t.mutation(updateTask, {
      taskId,
      actorId: agentId,
      status: "review",
      title: "Updated title"
    });

    const task = await t.run((ctx) => ctx.db.get(taskId));
    expect(task?.status).toBe("review");
    expect(task?.title).toBe("Updated title");

    const activities = await t.run((ctx) => ctx.db.query("activities").collect());
    expect(activities).toHaveLength(1);
    expect(activities[0]?.type).toBe("task_updated");
  });
});
