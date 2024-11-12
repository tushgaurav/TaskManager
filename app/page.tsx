import type { Metadata } from "next";
import TaskCore from "./TaskCore";

export const metadata: Metadata = {
  title: "Task Manager | SuperDM Assignment",
  description: "Assignment for SuperDM's Founding Frontend Engineer Role",
};

export default function Home() {
  return (
    <div className="container mx-auto py-6">
      <TaskCore />
    </div>
  )
}