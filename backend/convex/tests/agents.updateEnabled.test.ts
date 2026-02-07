import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent } from "./utils";

const updateEnabled = functionRef("functions/agents:updateEnabled");

describe("agents.updateEnabled", () => {
  it("updates enabled flag", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { enabled: false });

    const result = await t.mutation(updateEnabled, {
      agentId,
      enabled: true
    });

    expect(result.enabled).toBe(true);

    const agent = await t.run((ctx) => ctx.db.get(agentId));
    expect(agent?.enabled).toBe(true);
  });
});
