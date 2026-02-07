import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent } from "./utils";

const logActivity = functionRef("functions/activities:log");

describe("activities.log", () => {
  it("creates an activity entry", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { name: "Shuri" });

    const activityId = await t.mutation(logActivity, {
      type: "task_created",
      agentId,
      message: "Created a task"
    });

    const activity = await t.run((ctx) => ctx.db.get(activityId));
    expect(activity).not.toBeNull();
    expect(activity?.agentId).toBe(agentId);
    expect(activity?.type).toBe("task_created");
  });
});
