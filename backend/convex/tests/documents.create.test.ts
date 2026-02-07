import { describe, expect, it } from "vitest";
import { createTestClient, functionRef, seedAgent, seedTask } from "./utils";

const createDocument = functionRef("functions/documents:create");

describe("documents.create", () => {
  it("creates a document and logs activity", async () => {
    const t = createTestClient();
    const agentId = await seedAgent(t, { name: "Natasha" });
    const taskId = await seedTask(t);

    const { documentId } = await t.mutation(createDocument, {
      title: "Findings",
      content: "Markdown",
      type: "research",
      taskId,
      agentId
    });

    const doc = await t.run((ctx) => ctx.db.get(documentId));
    expect(doc?.title).toBe("Findings");
    expect(doc?.taskId).toBe(taskId);

    const activities = await t.run((ctx) => ctx.db.query("activities").collect());
    expect(activities).toHaveLength(1);
    expect(activities[0]?.type).toBe("document_created");
  });
});
