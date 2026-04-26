"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { addTodo, getTodos } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

export function AddTaskDialog({ onAddSuccess }: { onAddSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addTodo(task);
    if (res) {
      setTask({
        title: "",
        description: "",
        isCompleted: false,
      });
      setOpen(false);
      onAddSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:scale-105 transition-transform">
          <Plus className="w-4 h-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Task</DialogTitle>
          <DialogDescription className="opacity-60">
            Add a new task to your dashboard. Fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Finish UI Redesign"
                className="bg-white/5 border-white/10"
                autoFocus
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Brief description of the task..."
                className="bg-white/5 border-white/10"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="isCompleted"
                checked={task.isCompleted}
                onCheckedChange={(checked) => {
                  setTask({ ...task, isCompleted: checked as boolean });
                  console.log(checked);
                }}
              />
              <Label
                htmlFor="isCompleted"
                className="text-sm font-medium cursor-pointer"
              >
                Mark as Completed
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-primary shadow-lg shadow-primary/20"
            >
              Create Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
