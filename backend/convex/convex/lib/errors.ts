import { ConvexError } from "convex/values";

export const ErrorCode = {
  NotFound: "not_found",
  InvalidInput: "invalid_input",
  AlreadyExists: "already_exists"
} as const;

export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];

export function throwError(code: ErrorCodeValue, message: string): never {
  throw new ConvexError({ code, message });
}
