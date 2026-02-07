import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const assignTask = functionRef("functions/tasks:assign");
const createMessage = functionRef("functions/messages:create");
const subscribe = functionRef("functions/subscriptions:subscribe");

describe("subscriptions auto", () => {
  it("auto-subscribes on assignment and notifies subscribers", async () => {
    const t = createTestClient();
    const actorId = await seedAgent(t, { name: "Tony" });
    const assigneeId = await seedAgent(t, { name: "Steve", sessionKey: "agent:steve:main" });
    const subscriberId = await seedAgent(t, { name: "Wanda", sessionKey: "agent:wanda:main" });
    const taskId = await seedTask(t);

    await t.mutation(subscribe, { taskId, agentId: subscriberId });

    await t.mutation(assignTask, {
      taskId,
      actorId,
      assigneeIds: [assigneeId]
    });

    let notifications = await t.run((ctx) => ctx.db.query("notifications").collect());
    const assignmentTargets = notifications.map((notification) => notification.mentionedAgentId);
    expect(assignmentTargets).toContain(subscriberId);
    expect(assignmentTargets).toContain(assigneeId);

    await t.mutation(createMessage, {
      taskId,
      fromAgentId: actorId,
      content: "Update"
    });

    notifications = await t.run((ctx) => ctx.db.query("notifications").collect());
    const targetIds = notifications.map((notification) => notification.mentionedAgentId);
    expect(targetIds).toContain(assigneeId);
    expect(targetIds).toContain(subscriberId);
  });
});
