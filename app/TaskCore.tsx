"use client"

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown } from 'lucide-react';

type SortDirection = 'asc' | 'desc';

interface SortState {
    field: keyof Task | '';
    direction: SortDirection;
}

export default function TaskCore() {
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
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<SortState>({
        field: '',
        direction: 'asc',
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

    const handleTabChange = (value: TaskStatus | string) => {
        console.log("handleTabChange", value)
        setSelectedTab(value as TaskStatus);
    }

    // hotkey for changing tabs using left and right and cycle through tabs
    useHotkeys('left', (e) => {
        e.preventDefault();
        const tabs = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.CLOSED];
        const currentIndex = tabs.findIndex(tab => tab === selectedTab);
        setSelectedTab(tabs[(currentIndex + tabs.length - 1) % tabs.length]);
    });

    useHotkeys('right', (e) => {
        e.preventDefault();
        const tabs = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.CLOSED];
        const currentIndex = tabs.findIndex(tab => tab === selectedTab);
        setSelectedTab(tabs[(currentIndex + 1) % tabs.length]);
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
        const updatedTasks = { ...tasks };
        const oldStatus = selectedTask?.status as TaskStatus;

        const taskIndex = updatedTasks[oldStatus].findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            const [movedTask] = updatedTasks[oldStatus].splice(taskIndex, 1);
            // Add to new status array with updated status
            movedTask.status = newStatus;
            updatedTasks[newStatus].push(movedTask);
            setTasks(updatedTasks);
        }
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

    const filteredAndSortedTasks = () => {
        let currentTasks = tasks[selectedTab];
        currentTasks = currentTasks.filter((task) =>
            task.name.toLowerCase().includes(search.toLowerCase())
        );

        if (sort.field) {
            currentTasks = currentTasks.sort((a, b) => {
                const aValue = sort.field ? a[sort.field] : '';
                const bValue = sort.field ? b[sort.field] : '';
                if (aValue! < bValue!) return sort.direction === 'asc' ? -1 : 1;
                if (aValue! > bValue!) return sort.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return currentTasks;
    };

    const handleSort = (field: keyof Task) => {
        setSort((prev) => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const renderTaskTable = () => (
        <div className="border rounded-md mt-4">
            <div className="flex items-center justify-between p-4 border-b">
                <Input
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center space-x-2">
                    {['Priority', 'ID', 'Name', 'Created'].map((field) => (
                        <button
                            key={field}
                            className="flex items-center gap-1 text-xs bg-gray-200 rounded-full p-2 py-1 text-muted-foreground hover:text-foreground"
                            onClick={() => handleSort(field.toLowerCase() as keyof Task)}
                        >
                            {field}
                            {sort.field === field.toLowerCase() && (
                                <span>{sort.direction === 'asc' ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

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
                    {filteredAndSortedTasks().map((task, index) => (
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
                                    {task.priority.toUpperCase()}
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

        <Tabs
            value={selectedTab}
            defaultValue={TaskStatus.OPEN}
            className="w-full"
            onValueChange={handleTabChange}
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

            {renderTaskTable()}

            <TaskDetailModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                task={selectedTask}
                onNextTask={handleNextTask}
                onPreviousTask={handlePreviousTask}
                onStatusChange={handleStatusChange}
            />
        </Tabs>

    );
};
