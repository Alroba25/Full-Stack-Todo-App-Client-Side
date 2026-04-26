"use client";

import { useState } from "react";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editTodo } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface EditTaskDialogProps {
  onAddSuccess: () => void;
  todoId: string;
  initialData: {
    title: string;
    description: string;
    isCompleted: boolean;
  };
}

export function EditTaskDialog({
  onAddSuccess,
  todoId,
  initialData,
}: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(initialData);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await editTodo(todoId, task);
    if (res) {
      setOpen(false);
      onAddSuccess();
    }
  };
  const handleEdit = (task: string) => {
    toast.info(`Editing task: ${task}`, {
      description: "This feature will be connected to the backend soon.",
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="gap-2 focus:bg-white/10 cursor-pointer w-full"
        >
          <Edit2 className="w-3.5 h-3.5" /> Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Task</DialogTitle>
          <DialogDescription className="opacity-60">
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="edit-title"
                placeholder="Task title"
                className="bg-white/5 border-white/10"
                autoFocus
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="edit-description"
                placeholder="Brief description..."
                className="bg-white/5 border-white/10"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="edit-isCompleted"
                checked={task.isCompleted}
                onCheckedChange={(checked) => {
                  setTask({ ...task, isCompleted: checked as boolean });
                }}
              />
              <Label
                htmlFor="edit-isCompleted"
                className="text-sm font-medium cursor-pointer"
              >
                Mark as Completed
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => handleEdit(task.title)}
              type="submit"
              className="w-full bg-primary shadow-lg shadow-primary/20"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
