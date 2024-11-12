import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Task, TaskStatus } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHotkeys } from 'react-hotkeys-hook';
import { format } from 'date-fns';

const TaskDetailModal = ({
    isOpen,
    onClose,
    task,
    onNextTask,
    onPreviousTask,
    onStatusChange,
}: {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    onNextTask: () => void;
    onPreviousTask: () => void;
    onStatusChange: (taskId: number, newStatus: TaskStatus) => Promise<void>;
}

) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<{ id: number; content: string; name_of_sender: string; created_at: string }[]>([]);
    const [showStatusConfirmation, setShowStatusConfirmation] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    // Mock comments - in real app, fetch from API
    useEffect(() => {
        if (task) {
            setComments([
                {
                    id: 1,
                    content: "Initial feedback provided",
                    name_of_sender: "John Doe",
                    created_at: new Date().toISOString()
                }
            ]);
        }
    }, [task]);

    // Keyboard shortcuts
    useHotkeys('left', (e) => {
        e.preventDefault();
        onPreviousTask();
    });

    useHotkeys('right', (e) => {
        e.preventDefault();
        onNextTask();
    });

    useHotkeys('1', () => handleStatusSelect('open'));
    useHotkeys('2', () => handleStatusSelect('in-progress'));
    useHotkeys('3', () => handleStatusSelect('closed'));

    const handleStatusSelect = (status) => {
        setNewStatus(status);
        setShowStatusConfirmation(true);
    };

    const handleStatusConfirm = async () => {
        await onStatusChange(task.id, newStatus);
        setShowStatusConfirmation(false);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: comments.length + 1,
            content: comment,
            name_of_sender: "Current User",
            created_at: new Date().toISOString()
        };

        setComments(prev => [...prev, newComment]);
        setComment('');
    };

    if (!task) return null;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose} className="max-w-4xl">
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold">
                                #{task.id} {task.name}
                            </DialogTitle>
                            <div className="flex items-center space-x-2">
                                <Button className='rounded-full' variant="ghost" size="sm" onClick={onPreviousTask}>
                                    <ArrowLeft />
                                </Button>
                                <Button className='rounded-full' variant="ghost" size="sm" onClick={onNextTask}>
                                    <ArrowRight />
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="col-span-2 space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Description</h3>
                                <p className="text-muted-foreground max-w-[60ch]">
                                    {task.description || "No description provided"}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold">Comments</h3>
                                <ScrollArea className="h-[300px] rounded-md border p-4">
                                    {comments.map((comment) => (
                                        <div key={comment.id} className="mb-4 last:mb-0">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">{comment.name_of_sender}</span>
                                                <span className="text-sm text-muted-foreground">
                                                    {format(new Date(comment.created_at), 'MMM dd, yyyy HH:mm')}
                                                </span>
                                            </div>
                                            <p className="mt-1">{comment.content}</p>
                                        </div>
                                    ))}
                                </ScrollArea>

                                <form onSubmit={handleCommentSubmit} className="space-y-2">
                                    <Textarea
                                        placeholder="Add a comment..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="min-h-[100px]"
                                    />
                                    <Button type="submit">Add Comment</Button>
                                </form>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Status</h3>
                                <Select
                                    value={task.status.toLowerCase()}
                                    onValueChange={handleStatusSelect}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">Open (1)</SelectItem>
                                        <SelectItem value="in-progress">In Progress (2)</SelectItem>
                                        <SelectItem value="closed">Closed (3)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Priority</h3>
                                <Badge className="bg-red-500">{task.priority.toUpperCase()}</Badge>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Labels</h3>
                                <div className="flex flex-wrap gap-1">
                                    {task.labels.map(label => (
                                        <Badge key={label} variant="outline">
                                            {label}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Assignee</h3>
                                <p>{task.assignee}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Created</h3>
                                <p>{format(new Date(task.created_at), 'MMM dd, yyyy HH:mm')}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={showStatusConfirmation} onOpenChange={setShowStatusConfirmation}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Change Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the status to {newStatus}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleStatusConfirm}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default TaskDetailModal;