import { useMutation, useQuery } from "convex/react";
import type { TaskStatus } from "../types";

export const useTasks = () => useQuery("tasks.list" as never);

export const useAgents = () => useQuery("agents.list" as never);

export const useMessages = (taskId?: string) =>
  useQuery("messages.listByTask" as never, taskId ? ({ taskId } as never) : "skip");

export const useDocuments = (taskId?: string) =>
  useQuery("documents.listByTask" as never, taskId ? ({ taskId } as never) : "skip");

export const useCreateTask = () => useMutation("tasks.create" as never);

export const useUpdateTask = () => useMutation("tasks.update" as never);

export const useAssignTask = () => useMutation("tasks.assign" as never);

export const useCreateMessage = () => useMutation("messages.create" as never);

export const useCreateDocument = () => useMutation("documents.create" as never);

export const useUpdateAgentEnabled = () => useMutation("agents.updateEnabled" as never);

export type CreateTaskInput = {
  title: string;
  description: string;
};

export type UpdateTaskInput = {
  taskId: string;
  status: TaskStatus;
};

export type AssignTaskInput = {
  taskId: string;
  agentId: string;
};

export type CreateMessageInput = {
  taskId: string;
  fromAgentId: string;
  content: string;
};

export type CreateDocumentInput = {
  taskId: string;
  title: string;
  type: "deliverable" | "research" | "protocol" | "other";
  content: string;
};

export type UpdateAgentEnabledInput = {
  agentId: string;
  enabled: boolean;
};
