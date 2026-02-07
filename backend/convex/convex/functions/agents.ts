import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { ErrorCode, throwError } from "../lib/errors";

export const updateEnabled = mutation({
  args: {
    agentId: v.id("agents"),
    enabled: v.boolean()
  },
  returns: v.object({
    agentId: v.id("agents"),
    enabled: v.boolean()
  }),
  handler: async (ctx, args) => {
    const agent = await ctx.db.get(args.agentId);
    if (!agent) {
      throwError(ErrorCode.NotFound, "Agent not found");
    }

    await ctx.db.patch(args.agentId, { enabled: args.enabled });

    return { agentId: args.agentId, enabled: args.enabled };
  }
});
