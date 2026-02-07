import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const assignTask = functionRef("functions/tasks:assign");

describe("tasks.assign", () => {
  it("assigns agents and logs activity", async () => {
    const t = createTestClient();
    const actorId = await seedAgent(t, { name: "Hill" });
    const assigneeId = await seedAgent(t, { name: "Banner", sessionKey: "agent:banner:main" });
    const taskId = await seedTask(t);

    await t.mutation(assignTask, {
      taskId,
      actorId,
      assigneeIds: [assigneeId]
    });

    const task = await t.run((ctx) => ctx.db.get(taskId));
    expect(task?.assigneeIds).toEqual([assigneeId]);
    expect(task?.status).toBe("assigned");

    const subscriptions = await t.run((ctx) => ctx.db.query("subscriptions").collect());
    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0]?.agentId).toBe(assigneeId);
  });
});
