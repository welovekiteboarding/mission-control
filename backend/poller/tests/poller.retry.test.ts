import { describe, expect, it, vi } from "vitest";
import {
  computeBackoffMs,
  NotificationPoller
} from "../src/poller.js";
import { OpenClawError } from "../src/openclaw.js";

const createPoller = (now: Date) => {
  const store = {
    listPendingNotifications: vi.fn(),
    getAgentById: vi.fn(),
    markDelivered: vi.fn(),
    recordRetry: vi.fn()
  };
  const openclaw = {
    sendSessionMessage: vi.fn()
  };
  const poller = new NotificationPoller({
    store,
    openclaw,
    maxRetries: 5,
    clock: () => now,
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() }
  });

  return { poller, store, openclaw };
};

describe("NotificationPoller retries", () => {
  it("backs off and records retry on rate limit", async () => {
    const now = new Date("2026-02-01T00:00:00Z");
    const { poller, store, openclaw } = createPoller(now);
    store.listPendingNotifications.mockResolvedValue([
      {
        id: "notifications:2",
        mentionedAgentId: "agents:2",
        content: "Retry me",
        delivered: false,
        retryCount: 1,
        nextAttemptAt: null
      }
    ]);
    store.getAgentById.mockResolvedValue({
      id: "agents:2",
      enabled: true,
      sessionKey: "session-2"
    });
    openclaw.sendSessionMessage.mockRejectedValue(
      new OpenClawError("rate_limit", "Rate limited")
    );

    await poller.processOnce();

    const expectedNextAttempt = new Date(
      now.getTime() + computeBackoffMs(2)
    );
    expect(store.recordRetry).toHaveBeenCalledWith({
      id: "notifications:2",
      retryCount: 2,
      nextAttemptAt: expectedNextAttempt
    });
    expect(store.markDelivered).not.toHaveBeenCalled();
  });
});
