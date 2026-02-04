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
  fromAgentId: string;
  content: string;
  createdAt: string;
};

export type Document = {
  id: string;
  taskId: string | null;
  title: string;
  content: string;
  type: "deliverable" | "research" | "protocol" | "other";
};
