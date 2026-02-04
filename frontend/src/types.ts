export type TaskStatus = "inbox" | "assigned" | "in_progress" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeIds: string[];
};

export type AgentStatus = "idle" | "active" | "blocked";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  enabled: boolean;
};

export type Message = {
  id: string;
  taskId: string;
  fromAgent: string;
  content: string;
  createdAt: string;
};

export type DocumentType = "deliverable" | "research" | "protocol" | "other";

export type Document = {
  id: string;
  taskId: string | null;
  title: string;
  content: string;
  type: DocumentType;
  createdAt: string;
};

export type Activity = {
  id: string;
  message: string;
  agent: string;
  type: string;
  createdAt: string;
};

export type CreateTaskInput = {
  title: string;
  description: string;
};

export type UpdateTaskStatusInput = {
  taskId: string;
  status: TaskStatus;
};

export type AssignTaskInput = {
  taskId: string;
  assigneeId: string;
};

export type CreateMessageInput = {
  taskId: string;
  content: string;
};

export type CreateDocumentInput = {
  taskId: string;
  title: string;
  content: string;
  type: DocumentType;
};

export type UpdateAgentEnabledInput = {
  agentId: string;
  enabled: boolean;
};
