import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { ErrorCode, throwError } from "../lib/errors";

type StandupSummary = {
  summary: string;
  completedTasks: string[];
  inProgressTasks: string[];
  blockedTasks: string[];
  keyDecisions: string[];
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseIsoDay(date: string): { startMs: number; endMs: number } {
  if (!DATE_RE.test(date)) {
    throwError(ErrorCode.InvalidInput, "date must be YYYY-MM-DD");
  }

  const start = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(start.getTime())) {
    throwError(ErrorCode.InvalidInput, "invalid date");
  }

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { startMs: start.getTime(), endMs: end.getTime() };
}

export const generate = mutation({
  args: {
    date: v.string()
  },
  returns: v.object({
    summary: v.string(),
    completedTasks: v.array(v.string()),
    inProgressTasks: v.array(v.string()),
    blockedTasks: v.array(v.string()),
    keyDecisions: v.array(v.string())
  }),
  handler: async (ctx, args): Promise<StandupSummary> => {
    const { startMs, endMs } = parseIsoDay(args.date);

    const [tasks, agents, activities] = await Promise.all([
      ctx.db.query("tasks").collect(),
      ctx.db.query("agents").collect(),
      ctx.db.query("activities").collect()
    ]);

    const dailyActivities = activities.filter(
      (activity) =>
        activity._creationTime >= startMs && activity._creationTime < endMs
    );

    const completedTasks = tasks
      .filter((task) => task.status === "done")
      .map((task) => task.title);

    const inProgressTasks = tasks
      .filter((task) => task.status === "in_progress")
      .map((task) => task.title);

    const blockedAgentIds = new Set(
      agents.filter((agent) => agent.status === "blocked").map((agent) => agent._id)
    );
    const blockedTasks = tasks
      .filter((task) => task.assigneeIds.some((id) => blockedAgentIds.has(id)))
      .map((task) => task.title);

    const keyDecisions = dailyActivities
      .filter((activity) => /decision|decided/i.test(activity.message))
      .map((activity) => activity.message);

    const summaryLines: string[] = [];
    summaryLines.push(`Daily standup for ${args.date}`);

    if (dailyActivities.length === 0) {
      summaryLines.push("No activity recorded for this day.");
      summaryLines.push("Completed: none.");
      summaryLines.push("In progress: none.");
    } else {
      summaryLines.push(`Activities: ${dailyActivities.length}.`);
      summaryLines.push(
        `Completed: ${completedTasks.length > 0 ? completedTasks.join(", ") : "none"}.`
      );
      summaryLines.push(
        `In progress: ${inProgressTasks.length > 0 ? inProgressTasks.join(", ") : "none"}.`
      );
    }

    if (blockedTasks.length > 0) {
      summaryLines.push(`Blocked: ${blockedTasks.join(", ")}.`);
    }
    if (keyDecisions.length > 0) {
      summaryLines.push(`Key decisions: ${keyDecisions.join(" | ")}.`);
    }

    return {
      summary: summaryLines.join("\n"),
      completedTasks,
      inProgressTasks,
      blockedTasks,
      keyDecisions
    };
  }
});
