"use client"

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import TaskDetailModal from '@/app/_components/task-detail';
import { getTasks } from '@/lib/db';
import { Priority, Task, TaskStatus } from '@/lib/definitions';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState<TaskStatus>(TaskStatus.OPEN);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<{
    [key in TaskStatus]: Task[];
  }>({
    [TaskStatus.OPEN]: getTasks(TaskStatus.OPEN),
    [TaskStatus.IN_PROGRESS]: getTasks(TaskStatus.IN_PROGRESS),
    [TaskStatus.CLOSED]: getTasks(TaskStatus.CLOSED),
  });

  // Keyboard navigation
  useHotkeys('up', (e) => {
    e.preventDefault();
    setSelectedRowIndex(prev => Math.max(0, prev - 1));
  });

  useHotkeys('down', (e) => {
    e.preventDefault();
    const currentTasks = tasks[selectedTab] || [];
    setSelectedRowIndex(prev => Math.min(currentTasks.length - 1, prev + 1));
  });

  useHotkeys('enter', (e) => {
    e.preventDefault();
    const currentTasks = tasks[selectedTab] || [];
    if (currentTasks[selectedRowIndex]) {
      handleTaskSelect(currentTasks[selectedRowIndex]);
    }
  });

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleNextTask = () => {
    const currentTasks = tasks[selectedTab] || [];
    if (selectedTask) {
      const currentIndex = currentTasks.findIndex(task => task.id === selectedTask.id);
      if (currentIndex < currentTasks.length - 1) {
        setSelectedTask(currentTasks[currentIndex + 1]);
        setSelectedRowIndex(currentIndex + 1);
      }
    }
  };

  const handlePreviousTask = () => {
    const currentTasks = tasks[selectedTab] || [];
    if (selectedTask) {
      const currentIndex = currentTasks.findIndex(task => task.id === selectedTask.id);
      if (currentIndex > 0) {
        setSelectedTask(currentTasks[currentIndex - 1]);
        setSelectedRowIndex(currentIndex - 1);
      }
    }
  };

  const handleStatusChange = async (taskId: number, newStatus: TaskStatus) => {
    // Update local state
    const updatedTasks = { ...tasks };
    const oldStatus = selectedTask?.status as TaskStatus;

    // Remove from old status array
    const taskIndex = updatedTasks[oldStatus].findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const [movedTask] = updatedTasks[oldStatus].splice(taskIndex, 1);
      // Add to new status array with updated status
      movedTask.status = newStatus;
      updatedTasks[newStatus].push(movedTask);
      setTasks(updatedTasks);
    }

    handleModalClose();
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT:
        return 'bg-red-500';
      case Priority.HIGH:
        return 'bg-orange-500';
      case Priority.MEDIUM:
        return 'bg-yellow-500';
      case Priority.LOW:
        return 'bg-blue-500';
      default:
        return 'bg-blue-500';
    }
  };

  const renderTaskTable = (tasks: Task[]) => (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Priority</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Labels</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Assignee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.id}
              className={`cursor-pointer ${selectedRowIndex === index ? 'bg-muted' : ''}`}
              onClick={() => {
                setSelectedRowIndex(index);
                handleTaskSelect(task);
              }}
            >
              <TableCell>
                <Badge className={`${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>#{task.id}</TableCell>
              <TableCell className="font-medium">{task.name}</TableCell>
              <TableCell>
                {task.labels.map(label => (
                  <Badge key={label} variant="outline" className="mr-1">
                    {label}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{format(new Date(task.created_at), 'MMM dd, yyyy')}</TableCell>
              <TableCell>{task.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto py-6">
      <Tabs
        defaultValue={TaskStatus.OPEN}
        className="w-full"
        onValueChange={(value) => setSelectedTab(value as TaskStatus)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value={TaskStatus.OPEN}>
            Open ({tasks[TaskStatus.OPEN]?.length || 0})
          </TabsTrigger>
          <TabsTrigger value={TaskStatus.IN_PROGRESS}>
            In Progress ({tasks[TaskStatus.IN_PROGRESS]?.length || 0})
          </TabsTrigger>
          <TabsTrigger value={TaskStatus.CLOSED}>
            Closed ({tasks[TaskStatus.CLOSED]?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TaskStatus.OPEN}>
          {renderTaskTable(tasks[TaskStatus.OPEN])}
        </TabsContent>

        <TabsContent value={TaskStatus.IN_PROGRESS}>
          {renderTaskTable(tasks[TaskStatus.IN_PROGRESS])}
        </TabsContent>

        <TabsContent value={TaskStatus.CLOSED}>
          {renderTaskTable(tasks[TaskStatus.CLOSED])}
        </TabsContent>

        <TaskDetailModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          task={selectedTask}
          onNextTask={handleNextTask}
          onPreviousTask={handlePreviousTask}
          onStatusChange={handleStatusChange}
        />
      </Tabs>
    </div>
  );
};

export default HomePage;