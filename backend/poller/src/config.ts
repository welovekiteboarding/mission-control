export type PollerConfig = {
  convexUrl: string;
  convexToken: string;
  gatewayUrl: string;
  gatewayToken: string;
  slackTargets: string[];
  pollIntervalMs: number;
  maxRetries: number;
  gatewayTimeoutMs: number;
};

const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_GATEWAY_TIMEOUT_MS = 5000;

const requireEnv = (env: NodeJS.ProcessEnv, key: string): string => {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const parseNumberEnv = (
  env: NodeJS.ProcessEnv,
  key: string,
  fallback: number
): number => {
  const raw = env[key];
  if (!raw) {
    return fallback;
  }
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid numeric value for ${key}`);
  }
  return parsed;
};

const parseSlackTargets = (value: string): string[] => {
  const targets = value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (targets.length === 0) {
    throw new Error("SLACK_TARGETS must include at least one target");
  }
  return targets;
};

export const loadConfig = (env: NodeJS.ProcessEnv = process.env): PollerConfig => {
  const slackTargetsRaw = requireEnv(env, "SLACK_TARGETS");

  return {
    convexUrl: requireEnv(env, "CONVEX_URL"),
    convexToken: requireEnv(env, "CONVEX_TOKEN"),
    gatewayUrl: requireEnv(env, "GATEWAY_URL"),
    gatewayToken: requireEnv(env, "GATEWAY_TOKEN"),
    slackTargets: parseSlackTargets(slackTargetsRaw),
    pollIntervalMs: parseNumberEnv(env, "POLL_INTERVAL_MS", DEFAULT_POLL_INTERVAL_MS),
    maxRetries: parseNumberEnv(env, "NOTIFICATIONS_MAX_RETRIES", DEFAULT_MAX_RETRIES),
    gatewayTimeoutMs: parseNumberEnv(
      env,
      "GATEWAY_TIMEOUT_MS",
      DEFAULT_GATEWAY_TIMEOUT_MS
    )
  };
};
