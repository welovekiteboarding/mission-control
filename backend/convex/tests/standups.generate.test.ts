import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const generateStandup = functionRef("functions/standups:generate");

const isoToday = () => new Date().toISOString().slice(0, 10);

describe("standups.generate", () => {
  it("aggregates completed, in-progress, blocked tasks and key decisions", async () => {
    const t = createTestClient();

    const blockedAgentId = await seedAgent(t, { name: "Blocked Agent", status: "blocked" });
    await seedAgent(t, { name: "Normal Agent", status: "active" });

    await seedTask(t, {
      title: "Finalize API contract",
      status: "done",
      assigneeIds: []
    });
    await seedTask(t, {
      title: "Implement poller retry logic",
      status: "in_progress",
      assigneeIds: []
    });
    await seedTask(t, {
      title: "Investigate webhook failures",
      status: "assigned",
      assigneeIds: [blockedAgentId]
    });

    await t.run(async (ctx) => {
      await ctx.db.insert("activities", {
        type: "task_updated",
        agentId: blockedAgentId,
        message: "Decision: use exponential backoff with jitter"
      });
    });

    const summary = await t.mutation(generateStandup, { date: isoToday() });

    expect(summary.completedTasks).toContain("Finalize API contract");
    expect(summary.inProgressTasks).toContain("Implement poller retry logic");
    expect(summary.blockedTasks).toContain("Investigate webhook failures");
    expect(summary.keyDecisions).toContain("Decision: use exponential backoff with jitter");
    expect(summary.summary).toContain("Daily standup for");
  });

  it("reports no completed or in-progress items when no daily activity exists", async () => {
    const t = createTestClient();

    const summary = await t.mutation(generateStandup, { date: "1999-01-01" });

    expect(summary.summary).toContain("No activity recorded for this day.");
    expect(summary.summary).toContain("Completed: none.");
    expect(summary.summary).toContain("In progress: none.");
    expect(summary.keyDecisions).toHaveLength(0);
  });

  it("rejects invalid date formats", async () => {
    const t = createTestClient();

    await expect(t.mutation(generateStandup, { date: "01-31-2026" })).rejects.toThrow();
  });
});
