import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type TaskStatus = "Inbox" | "In Progress" | "Review" | "Done";

export type Agent = {
  id: string;
  name: string;
  role: string;
  status: "Idle" | "Working" | "Offline";
  enabled: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignees: string[];
  createdAt: number;
};

export type Message = {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: number;
};

export type Document = {
  id: string;
  taskId: string;
  title: string;
  content: string;
  createdAt: number;
};

export type Activity = {
  id: string;
  summary: string;
  createdAt: number;
};

export type ConvexState = {
  agents: Agent[];
  tasks: Task[];
  messages: Message[];
  documents: Document[];
  activities: Activity[];
};

type ConvexMutations = {
  createTask: (input: { title: string; description: string }) => void;
  updateTaskStatus: (input: { taskId: string; status: TaskStatus }) => void;
  assignTask: (input: { taskId: string; agentId: string }) => void;
  createMessage: (input: { taskId: string; authorId: string; content: string }) => void;
  createDocument: (input: {
    taskId: string;
    title: string;
    content: string;
  }) => void;
  toggleAgentEnabled: (input: { agentId: string }) => void;
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialAgents: Agent[] = [
  { id: "agent-1", name: "Aurora", role: "Planner", status: "Working", enabled: true },
  { id: "agent-2", name: "Vega", role: "Implementer", status: "Idle", enabled: true },
  { id: "agent-3", name: "Nyx", role: "Reviewer", status: "Offline", enabled: false }
];

const ConvexContext = createContext<
  (ConvexState & { mutations: ConvexMutations }) | undefined
>(undefined);

export type ConvexProviderProps = {
  initialData?: Partial<ConvexState>;
  children: React.ReactNode;
};

export const ConvexProvider = ({ children, initialData }: ConvexProviderProps) => {
  const [agents, setAgents] = useState<Agent[]>(initialData?.agents ?? initialAgents);
  const [tasks, setTasks] = useState<Task[]>(initialData?.tasks ?? []);
  const [messages, setMessages] = useState<Message[]>(initialData?.messages ?? []);
  const [documents, setDocuments] = useState<Document[]>(initialData?.documents ?? []);
  const [activities, setActivities] = useState<Activity[]>(
    initialData?.activities ?? []
  );

  const logActivity = useCallback((summary: string) => {
    setActivities((prev) => [
      { id: createId(), summary, createdAt: Date.now() },
      ...prev
    ]);
  }, []);

  const mutations = useMemo<ConvexMutations>(
    () => ({
      createTask: ({ title, description }) => {
        const taskId = createId();
        setTasks((prev) => [
          {
            id: taskId,
            title,
            description,
            status: "Inbox",
            assignees: [],
            createdAt: Date.now()
          },
          ...prev
        ]);
        logActivity(`Task created: ${title}`);
      },
      updateTaskStatus: ({ taskId, status }) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status } : task
          )
        );
        logActivity(`Status updated: ${status}`);
      },
      assignTask: ({ taskId, agentId }) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  assignees: task.assignees.includes(agentId)
                    ? task.assignees
                    : [...task.assignees, agentId]
                }
              : task
          )
        );
        const agent = agents.find((item) => item.id === agentId);
        logActivity(`Assigned to ${agent?.name ?? "agent"}`);
      },
      createMessage: ({ taskId, authorId, content }) => {
        const author = agents.find((agent) => agent.id === authorId);
        setMessages((prev) => [
          {
            id: createId(),
            taskId,
            authorId,
            authorName: author?.name ?? "Agent",
            content,
            createdAt: Date.now()
          },
          ...prev
        ]);
        logActivity(`Comment added by ${author?.name ?? "agent"}`);
      },
      createDocument: ({ taskId, title, content }) => {
        setDocuments((prev) => [
          {
            id: createId(),
            taskId,
            title,
            content,
            createdAt: Date.now()
          },
          ...prev
        ]);
        logActivity(`Document added: ${title}`);
      },
      toggleAgentEnabled: ({ agentId }) => {
        setAgents((prev) =>
          prev.map((agent) =>
            agent.id === agentId ? { ...agent, enabled: !agent.enabled } : agent
          )
        );
      }
    }),
    [agents, logActivity]
  );

  const value = useMemo(
    () => ({ agents, tasks, messages, documents, activities, mutations }),
    [agents, tasks, messages, documents, activities, mutations]
  );

  return <ConvexContext.Provider value={value}>{children}</ConvexContext.Provider>;
};

const useConvexContext = () => {
  const context = useContext(ConvexContext);
  if (!context) {
    throw new Error("ConvexProvider is missing in the component tree.");
  }
  return context;
};

export type QueryName =
  | "agents.list"
  | "tasks.list"
  | "tasks.byId"
  | "messages.byTask"
  | "documents.byTask"
  | "activities.list";

export type MutationName =
  | "tasks.create"
  | "tasks.updateStatus"
  | "tasks.assign"
  | "messages.create"
  | "documents.create"
  | "agents.toggleEnabled";

export const useQuery = (name: QueryName, args?: { taskId?: string }) => {
  const { agents, tasks, messages, documents, activities } = useConvexContext();
  switch (name) {
    case "agents.list":
      return agents;
    case "tasks.list":
      return tasks;
    case "tasks.byId":
      return tasks.find((task) => task.id === args?.taskId) ?? null;
    case "messages.byTask":
      return messages.filter((message) => message.taskId === args?.taskId);
    case "documents.byTask":
      return documents.filter((document) => document.taskId === args?.taskId);
    case "activities.list":
      return activities;
    default:
      return [];
  }
};

export const useMutation = (name: MutationName) => {
  const { mutations } = useConvexContext();
  switch (name) {
    case "tasks.create":
      return mutations.createTask;
    case "tasks.updateStatus":
      return mutations.updateTaskStatus;
    case "tasks.assign":
      return mutations.assignTask;
    case "messages.create":
      return mutations.createMessage;
    case "documents.create":
      return mutations.createDocument;
    case "agents.toggleEnabled":
      return mutations.toggleAgentEnabled;
    default:
      return () => undefined;
  }
};
