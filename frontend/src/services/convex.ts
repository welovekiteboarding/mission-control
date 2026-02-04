import { useMutation, useQuery } from "convex/react";
import type { FunctionReference } from "convex/server";
import type {
  Activity,
  Agent,
  AssignTaskInput,
  CreateDocumentInput,
  CreateMessageInput,
  CreateTaskInput,
  Document,
  Message,
  Task,
  UpdateAgentEnabledInput,
  UpdateTaskStatusInput,
} from "../types";

type QueryRef<Args, Return> = FunctionReference<"query", Args, Return>;
type MutationRef<Args, Return> = FunctionReference<"mutation", Args, Return>;

const api = {
  tasks: {
    list: {} as QueryRef<Record<string, never>, Task[]>,
    create: {} as MutationRef<CreateTaskInput, string>,
    updateStatus: {} as MutationRef<UpdateTaskStatusInput, null>,
    assign: {} as MutationRef<AssignTaskInput, null>,
  },
  agents: {
    list: {} as QueryRef<Record<string, never>, Agent[]>,
    updateEnabled: {} as MutationRef<UpdateAgentEnabledInput, null>,
  },
  messages: {
    listByTask: {} as QueryRef<{ taskId: string }, Message[]>,
    create: {} as MutationRef<CreateMessageInput, string>,
  },
  documents: {
    listByTask: {} as QueryRef<{ taskId: string }, Document[]>,
    create: {} as MutationRef<CreateDocumentInput, string>,
  },
  activities: {
    listRecent: {} as QueryRef<Record<string, never>, Activity[]>,
  },
};

export const useTasks = () => useQuery(api.tasks.list, {}) ?? [];
export const useAgents = () => useQuery(api.agents.list, {}) ?? [];
export const useActivities = () => useQuery(api.activities.listRecent, {}) ?? [];

export const useTask = (taskId: string) => {
  const tasks = useTasks();
  return tasks.find((task) => task.id === taskId) ?? null;
};

export const useTaskMessages = (taskId: string) =>
  useQuery(api.messages.listByTask, { taskId }) ?? [];

export const useTaskDocuments = (taskId: string) =>
  useQuery(api.documents.listByTask, { taskId }) ?? [];

export const useCreateTask = () => useMutation(api.tasks.create);
export const useUpdateTaskStatus = () => useMutation(api.tasks.updateStatus);
export const useAssignTask = () => useMutation(api.tasks.assign);
export const usePostMessage = () => useMutation(api.messages.create);
export const usePostDocument = () => useMutation(api.documents.create);
export const useUpdateAgentEnabled = () => useMutation(api.agents.updateEnabled);
