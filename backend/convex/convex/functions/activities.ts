import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { ErrorCode, throwError } from "../lib/errors";
import { activityTypeValidator } from "../lib/validators";

export const log = mutation({
  args: {
    type: activityTypeValidator,
    agentId: v.id("agents"),
    message: v.string()
  },
  returns: v.id("activities"),
  handler: async (ctx, args) => {
    const agent = await ctx.db.get(args.agentId);
    if (!agent) {
      throwError(ErrorCode.NotFound, "Agent not found");
    }

    return ctx.db.insert("activities", {
      type: args.type,
      agentId: args.agentId,
      message: args.message
    });
  }
});
