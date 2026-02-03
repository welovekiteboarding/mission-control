import { describe, expect, it, vi } from "vitest";
import { NotificationPoller } from "../src/poller.js";

const createPoller = () => {
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
    maxRetries: 2,
    clock: () => new Date("2026-02-01T00:00:00Z"),
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() }
  });

  return { poller, store, openclaw };
};

describe("NotificationPoller skips", () => {
  it("skips delivered, disabled, and max-retry notifications", async () => {
    const { poller, store, openclaw } = createPoller();
    store.listPendingNotifications.mockResolvedValue([
      {
        id: "notifications:delivered",
        mentionedAgentId: "agents:1",
        content: "Already delivered",
        delivered: true,
        retryCount: 0,
        nextAttemptAt: null
      },
      {
        id: "notifications:disabled",
        mentionedAgentId: "agents:2",
        content: "Disabled",
        delivered: false,
        retryCount: 0,
        nextAttemptAt: null
      },
      {
        id: "notifications:max",
        mentionedAgentId: "agents:3",
        content: "Too many",
        delivered: false,
        retryCount: 2,
        nextAttemptAt: null
      }
    ]);

    store.getAgentById.mockImplementation(async (id: string) => {
      if (id === "agents:2") {
        return { id, enabled: false, sessionKey: "session-2" };
      }
      return { id, enabled: true, sessionKey: "session" };
    });

    await poller.processOnce();

    expect(openclaw.sendSessionMessage).not.toHaveBeenCalled();
    expect(store.markDelivered).not.toHaveBeenCalled();
    expect(store.recordRetry).not.toHaveBeenCalled();
  });
});
