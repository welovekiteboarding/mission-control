import { loadConfig } from "./config.js";
import { createConvexClient } from "./convex.js";
import { createOpenClawClient } from "./openclaw.js";
import { NotificationPoller } from "./poller.js";
import { createConvexNotificationStore } from "./store.js";

export const startPoller = async (): Promise<() => void> => {
  const config = loadConfig();
  const convexClient = createConvexClient({
    convexUrl: config.convexUrl,
    convexToken: config.convexToken
  });
  const store = createConvexNotificationStore(convexClient);
  const openclaw = createOpenClawClient({
    gatewayUrl: config.gatewayUrl,
    gatewayToken: config.gatewayToken,
    timeoutMs: config.gatewayTimeoutMs
  });

  const poller = new NotificationPoller({
    store,
    openclaw,
    maxRetries: config.maxRetries
  });

  const runOnce = async () => {
    try {
      await poller.processOnce();
    } catch (error) {
      console.error("Poller run failed", error);
    }
  };

  await runOnce();
  const interval = setInterval(runOnce, config.pollIntervalMs);

  return () => clearInterval(interval);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  startPoller().catch((error) => {
    console.error("Poller failed to start", error);
    process.exit(1);
  });
}
