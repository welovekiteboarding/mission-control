import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const subscribe = functionRef("functions/subscriptions:subscribe");
const unsubscribe = functionRef("functions/subscriptions:unsubscribe");

describe("subscriptions", () => {
  it("subscribes and unsubscribes", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { name: "Carol" });
    const taskId = await seedTask(t);

    const { subscriptionId } = await t.mutation(subscribe, { taskId, agentId });
    expect(subscriptionId).toBeDefined();

    await t.mutation(unsubscribe, { taskId, agentId });

    const subscriptions = await t.run((ctx) => ctx.db.query("subscriptions").collect());
    expect(subscriptions).toHaveLength(0);
  });
});
