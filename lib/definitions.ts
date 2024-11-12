export const enum Priority {
  URGENT = "urgent",
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export type Task = {
  id: number;
  name: string;
  labels: string[];
  status: TaskStatus;
  created_at: string;
  updated_at: string;
  priority: Priority;
  assignee: string;
};

export const enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in-progress",
  CLOSED = "closed",
}
