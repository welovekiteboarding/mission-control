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
    maxRetries: 5,
    clock: () => new Date("2026-02-01T00:00:00Z"),
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() }
  });

  return { poller, store, openclaw };
};

describe("NotificationPoller", () => {
  it("delivers notifications and marks them delivered", async () => {
    const { poller, store, openclaw } = createPoller();
    store.listPendingNotifications.mockResolvedValue([
      {
        id: "notifications:1",
        mentionedAgentId: "agents:1",
        content: "Hello",
        delivered: false,
        retryCount: 0,
        nextAttemptAt: null
      }
    ]);
    store.getAgentById.mockResolvedValue({
      id: "agents:1",
      enabled: true,
      sessionKey: "session-1"
    });

    await poller.processOnce();

    expect(openclaw.sendSessionMessage).toHaveBeenCalledWith({
      sessionKey: "session-1",
      content: "Hello"
    });
    expect(store.markDelivered).toHaveBeenCalledWith("notifications:1");
    expect(store.recordRetry).not.toHaveBeenCalled();
  });
});
