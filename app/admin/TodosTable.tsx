"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Trash2,
  Calendar,
  Circle,
  CheckCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { deleteTodo } from "@/lib/utils";
import { memo } from "react";

function TodosTableComponent({
  todos = [],
  fetchData,
}: {
  todos: any[];
  fetchData: () => void;
}) {
  const handleDelete = async (task: string, taskId: string) => {
    await deleteTodo(taskId);
    await toast.error(`Deleting task: ${task}`, {
      description: "Are you sure? This action cannot be undone.",
    });
    fetchData();
  };
  return (
    <div className="rounded-xl border border-white/5 bg-white/5 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="hover:bg-transparent border-white/5">
            <TableHead className="w-[300px] text-xs font-semibold uppercase tracking-wider opacity-50">
              Task
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">
              Assigned To
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">
              Priority
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">
              Status
            </TableHead>
            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider opacity-50">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <TableRow
                key={todo._id || todo.id}
                className="group border-white/5 hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {todo.title || todo.task}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] opacity-40 uppercase tracking-tighter mt-0.5">
                      <Calendar className="w-2.5 h-2.5" />
                      {new Date(
                        todo.createdAt || todo.date,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm opacity-80">
                    {todo.user?.name || todo.user || "Unknown"}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      text-[10px] py-0 px-1.5 h-5
                      ${
                        todo.priority === "Critical"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : todo.priority === "High"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : todo.priority === "Medium"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }
                    `}
                  >
                    {todo.priority || "Normal"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {todo.isCompleted || todo.status === "Completed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-amber-400" />
                    )}
                    <span className="text-sm">
                      {todo.isCompleted ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="glass border-white/10 w-40"
                    >
                      <DropdownMenuLabel>Todo Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-white/5" />
                      <EditTaskDialog
                        key={todo._id || todo.id}
                        onAddSuccess={fetchData}
                        todoId={todo._id}
                        initialData={{
                          title: todo.title,
                          description: todo.description,
                          isCompleted: todo.isCompleted,
                        }}
                      />
                      <DropdownMenuItem
                        onClick={() =>
                          handleDelete(
                            todo.title || todo.task,
                            todo._id || todo.id,
                          )
                        }
                        className="gap-2 text-rose-500 focus:bg-rose-500/10 focus:text-rose-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Todo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center opacity-50">
                No todos found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const TodosTable = memo(TodosTableComponent);
