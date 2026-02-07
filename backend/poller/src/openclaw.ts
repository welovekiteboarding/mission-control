export type OpenClawSendRequest = {
  sessionKey: string;
  content: string;
};

export type OpenClawClient = {
  sendSessionMessage: (request: OpenClawSendRequest) => Promise<void>;
};

export type OpenClawClientOptions = {
  gatewayUrl: string;
  gatewayToken: string;
  timeoutMs: number;
};

export type OpenClawErrorKind = "rate_limit" | "unreachable" | "unknown";

export class OpenClawError extends Error {
  readonly kind: OpenClawErrorKind;

  constructor(kind: OpenClawErrorKind, message: string) {
    super(message);
    this.name = "OpenClawError";
    this.kind = kind;
  }
}

export const isRetryableOpenClawError = (error: unknown): boolean => {
  if (!(error instanceof OpenClawError)) {
    return false;
  }
  return error.kind === "rate_limit" || error.kind === "unreachable";
};

type OpenClawRpcResponse = {
  error?: {
    code: number;
    message: string;
  };
};

export const createOpenClawClient = (
  options: OpenClawClientOptions
): OpenClawClient => {
  const { gatewayUrl, gatewayToken, timeoutMs } = options;
  const endpoint = gatewayUrl.replace(/\/$/, "") + "/rpc";

  return {
    async sendSessionMessage(request: OpenClawSendRequest): Promise<void> {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gatewayToken}`
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),
            method: "sessions_send",
            params: {
              sessionKey: request.sessionKey,
              message: request.content
            }
          }),
          signal: controller.signal
        });

        if (response.status === 429) {
          throw new OpenClawError("rate_limit", "OpenClaw rate limited");
        }

        if (!response.ok) {
          throw new OpenClawError(
            "unreachable",
            `OpenClaw gateway error: ${response.status}`
          );
        }

        const payload = (await response.json()) as OpenClawRpcResponse;
        if (payload.error) {
          throw new OpenClawError("unknown", payload.error.message);
        }
      } catch (error) {
        if (error instanceof OpenClawError) {
          throw error;
        }
        if (error instanceof DOMException && error.name === "AbortError") {
          throw new OpenClawError("unreachable", "OpenClaw request timed out");
        }
        throw new OpenClawError("unreachable", "OpenClaw request failed");
      } finally {
        clearTimeout(timeout);
      }
    }
  };
};
