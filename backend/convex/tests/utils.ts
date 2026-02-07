import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";
import schema from "../convex/schema";

export const modules = import.meta.glob("../convex/**/*.ts");

export const createTestClient = () => convexTest(schema, modules);

export const functionRef = (name: string) => makeFunctionReference(name);

export async function seedAgent(t: ReturnType<typeof createTestClient>, overrides?: Partial<any>) {
  return t.run(async (ctx) => {
    return ctx.db.insert("agents", {
      name: "Agent",
      role: "Operator",
      status: "idle",
      currentTaskId: null,
      sessionKey: "agent:operator:main",
      enabled: true,
      ...overrides
    });
  });
}

export async function seedTask(
  t: ReturnType<typeof createTestClient>,
  overrides?: Partial<any>
) {
  return t.run(async (ctx) => {
    return ctx.db.insert("tasks", {
      title: "Investigate",
      description: "Check system",
      status: "inbox",
      assigneeIds: [],
      ...overrides
    });
  });
}
