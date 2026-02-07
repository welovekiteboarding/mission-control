import { ConvexClient } from "./convex.js";
import { OpenClawClient } from "./openclaw.js";

export type StandupSummary = {
  summary: string;
  completedTasks: string[];
  inProgressTasks: string[];
  blockedTasks: string[];
  keyDecisions: string[];
};

export type StandupRunnerOptions = {
  client: ConvexClient;
  openclaw: OpenClawClient;
  slackTargets: string[];
  date?: string;
  logger?: Pick<Console, "info" | "warn" | "error">;
};

const formatDate = (date: Date): string =>
  date.toISOString().slice(0, 10);

export const runStandup = async (
  options: StandupRunnerOptions
): Promise<StandupSummary> => {
  const { client, openclaw, slackTargets, logger } = options;
  const effectiveDate = options.date ?? formatDate(new Date());
  const summary = await client.mutation<StandupSummary>("standups.generate", {
    date: effectiveDate
  });

  await Promise.all(
    slackTargets.map((target) =>
      openclaw.sendSessionMessage({
        sessionKey: target,
        content: summary.summary
      })
    )
  );

  logger?.info(`Standup summary delivered for ${effectiveDate}.`);
  return summary;
};
