import { isRetryableOpenClawError, OpenClawClient } from "./openclaw.js";

export type NotificationRecord = {
  id: string;
  mentionedAgentId: string;
  content: string;
  delivered: boolean;
  retryCount: number;
  nextAttemptAt?: Date | null;
};

export type AgentRecord = {
  id: string;
  enabled: boolean;
  sessionKey: string;
};

export type NotificationStore = {
  listPendingNotifications: (limit: number) => Promise<NotificationRecord[]>;
  getAgentById: (id: string) => Promise<AgentRecord | null>;
  markDelivered: (id: string) => Promise<void>;
  recordRetry: (input: {
    id: string;
    retryCount: number;
    nextAttemptAt: Date;
  }) => Promise<void>;
};

export type PollerOptions = {
  store: NotificationStore;
  openclaw: OpenClawClient;
  maxRetries: number;
  batchSize?: number;
  clock?: () => Date;
  logger?: Pick<Console, "info" | "warn" | "error">;
};

const DEFAULT_BATCH_SIZE = 25;
const BASE_BACKOFF_MS = 2000;
const MAX_BACKOFF_STEPS = 4;

export const computeBackoffMs = (attempt: number): number => {
  const exponent = Math.min(Math.max(attempt - 1, 0), MAX_BACKOFF_STEPS - 1);
  return BASE_BACKOFF_MS * 2 ** exponent;
};

export class NotificationPoller {
  private readonly store: NotificationStore;
  private readonly openclaw: OpenClawClient;
  private readonly maxRetries: number;
  private readonly batchSize: number;
  private readonly clock: () => Date;
  private readonly logger: Pick<Console, "info" | "warn" | "error">;

  constructor(options: PollerOptions) {
    this.store = options.store;
    this.openclaw = options.openclaw;
    this.maxRetries = options.maxRetries;
    this.batchSize = options.batchSize ?? DEFAULT_BATCH_SIZE;
    this.clock = options.clock ?? (() => new Date());
    this.logger = options.logger ?? console;
  }

  async processOnce(): Promise<void> {
    const notifications = await this.store.listPendingNotifications(
      this.batchSize
    );

    for (const notification of notifications) {
      if (notification.delivered) {
        continue;
      }

      if (notification.retryCount >= this.maxRetries) {
        this.logger.warn(
          `Notification ${notification.id} exceeded max retries; skipping.`
        );
        continue;
      }

      if (notification.nextAttemptAt) {
        const nextAttemptTime = notification.nextAttemptAt.getTime();
        if (nextAttemptTime > this.clock().getTime()) {
          continue;
        }
      }

      const agent = await this.store.getAgentById(
        notification.mentionedAgentId
      );

      if (!agent || !agent.enabled) {
        continue;
      }

      try {
        await this.openclaw.sendSessionMessage({
          sessionKey: agent.sessionKey,
          content: notification.content
        });
        await this.store.markDelivered(notification.id);
      } catch (error) {
        if (!isRetryableOpenClawError(error)) {
          this.logger.error(
            `Notification ${notification.id} failed with non-retryable error.`
          );
          continue;
        }

        const nextRetryCount = notification.retryCount + 1;
        const backoffMs = computeBackoffMs(nextRetryCount);
        const nextAttemptAt = new Date(this.clock().getTime() + backoffMs);

        await this.store.recordRetry({
          id: notification.id,
          retryCount: nextRetryCount,
          nextAttemptAt
        });
      }
    }
  }
}
