// Mock Database
import { Priority, Task, TaskStatus } from "@/lib/definitions";

const tasks: {
  [TaskStatus.OPEN]: Task[];
  [TaskStatus.IN_PROGRESS]: Task[];
  [TaskStatus.CLOSED]: Task[];
} = {
  [TaskStatus.OPEN]: [
    {
      id: 1,
      name: "File upload for chats",
      labels: ["Update pending"],
      status: TaskStatus.OPEN,
      created_at: "2023-11-22T13:10:13.649Z",
      updated_at: "2023-11-22T13:10:13.649Z",
      priority: Priority.HIGH,
      assignee: "John Doe",
    },
    {
      id: 2,
      name: "Add new user profile",
      labels: ["Update pending"],
      status: TaskStatus.OPEN,
      created_at: "2023-11-22T13:10:13.649Z",
      updated_at: "2023-11-22T13:10:13.649Z",
      priority: Priority.URGENT,
      assignee: "John Doe",
    },
  ],
  [TaskStatus.IN_PROGRESS]: [
    {
      id: 3,
      name: "Add new user profile",
      labels: ["Update pending"],
      status: TaskStatus.IN_PROGRESS,
      created_at: "2023-11-22T13:10:13.649Z",
      updated_at: "2023-11-22T13:10:13.649Z",
      priority: Priority.MEDIUM,
      assignee: "John Doe",
    },
  ],
  [TaskStatus.CLOSED]: [
    {
      id: 4,
      name: "Add new user profile",
      labels: ["Update pending"],
      status: TaskStatus.CLOSED,
      created_at: "2023-11-22T13:10:13.649Z",
      updated_at: "2023-11-22T13:10:13.649Z",
      priority: Priority.LOW,
      assignee: "John Doe",
    },
  ],
};

export const getTasks = (status: TaskStatus) => tasks[status];
