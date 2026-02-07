import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const createMessage = functionRef("functions/messages:create");

describe("messages.create", () => {
  it("creates a message, logs activity, and auto-subscribes", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { name: "Peter" });
    const taskId = await seedTask(t);

    const { messageId } = await t.mutation(createMessage, {
      taskId,
      fromAgentId: agentId,
      content: "Hello"
    });

    const message = await t.run((ctx) => ctx.db.get(messageId));
    expect(message?.content).toBe("Hello");

    const subscriptions = await t.run((ctx) => ctx.db.query("subscriptions").collect());
    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0]?.agentId).toBe(agentId);

    const activities = await t.run((ctx) => ctx.db.query("activities").collect());
    expect(activities).toHaveLength(1);
    expect(activities[0]?.type).toBe("message_sent");
  });
});
