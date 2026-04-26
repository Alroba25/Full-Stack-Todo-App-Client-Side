"use client";

import { Search, MoreVertical, Trash2, Calendar, Filter } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getTodos, getToken, deleteTodo, getProfile } from "@/lib/utils";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";

interface Todo {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: string;
  createdAt: string;
}

// Memoized TodoRow to prevent re-rendering the whole table
const TodoRow = memo(({ 
  todo, 
  handleDelete, 
  fetchData 
}: { 
  todo: Todo, 
  handleDelete: (id: string) => void,
  fetchData: () => void
}) => (
  <TableRow
    className="group border-white/5 hover:bg-white/5 transition-colors"
  >
    <TableCell>
      <Checkbox
        checked={todo.isCompleted}
        onCheckedChange={() => {}}
        className="border-white/20 data-[state=checked]:bg-primary"
      />
    </TableCell>
    <TableCell>
      <div className="flex flex-col">
        <span
          className={`font-medium ${todo.isCompleted ? "line-through opacity-40" : ""}`}
        >
          {todo.title}
        </span>
        <span className="text-xs opacity-50 max-w-[300px] truncate">
          {todo.description}
        </span>
      </div>
    </TableCell>
    <TableCell>
      <span
        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          todo.isCompleted
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-amber-500/10 text-amber-400"
        }`}
      >
        {todo.isCompleted ? "Completed" : "In-progress"}
      </span>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2 text-sm opacity-60">
        <Calendar className="w-3.5 h-3.5" />
        {todo.dueDate || "No Date"}
      </div>
    </TableCell>
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="glass border-white/10"
        >
          <EditTaskDialog
            onAddSuccess={fetchData}
            todoId={todo._id}
            initialData={{
              title: todo.title,
              description: todo.description,
              isCompleted: todo.isCompleted,
            }}
          />
          <DropdownMenuItem
            onClick={() => handleDelete(todo._id)}
            className="gap-2 text-rose-500 focus:bg-rose-500/10 focus:text-rose-500 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
));

TodoRow.displayName = "TodoRow";

export default function TodoPage() {
  const router = useRouter();
  const token = getToken();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTodos();
      setTodos(data || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, fetchData]);

  const handleDelete = useCallback(async (id: string) => {
    const res = await deleteTodo(id);
    if (res) {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    }
  }, []);

  const profileHandler = useCallback(async () => {
    try {
      const res = await getProfile();
      if (res) setProfile(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (token) profileHandler();
  }, [token, profileHandler]);

  // High Performance Filtering
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [todos, searchQuery]);

  // High Performance Stats calculation
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.isCompleted).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [todos]);

  const isAdmin = useMemo(() => profile?.role === "admin", [profile?.role]);

  return (
    <div className="flex h-screen bg-transparent">
      <Sidebar isAdmin={isAdmin} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          onAddSuccess={fetchData} 
          searchValue={searchQuery} 
          onSearch={setSearchQuery} 
        />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Tasks" value={stats.total} type="blue" subtitle="Active tasks" />
            <StatCard title="Completed" value={stats.completed} type="emerald" subtitle="Tasks done" />
            <StatCard title="Pending" value={stats.pending} type="rose" subtitle="Remaining" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter bg-linear-to-b from-white via-white to-white/20 bg-clip-text text-transparent drop-shadow-sm">
                Active Tasks
              </h2>
              <Button variant="outline" size="sm" className="gap-2 glass border-white/10">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>

            <Card className="glass-card border-none overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="hover:bg-transparent border-white/5">
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">Task</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">Due Date</TableHead>
                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wider opacity-50">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <LoadingRow />
                  ) : filteredTodos.length === 0 ? (
                    <EmptyRow />
                  ) : (
                    filteredTodos.map((todo) => (
                      <TodoRow 
                        key={todo._id} 
                        todo={todo} 
                        handleDelete={handleDelete} 
                        fetchData={fetchData} 
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const StatCard = memo(({ title, value, type, subtitle }: { title: string, value: number, type: "blue" | "emerald" | "rose", subtitle: string }) => (
  <Card className="glass-card border-none overflow-hidden group">
    <div className={`absolute inset-0 bg-linear-to-br from-${type}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium opacity-60">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      <p className={`text-xs text-${type}-500 mt-1 flex items-center gap-1`}>
        {subtitle} <span className="opacity-50 text-foreground">in dashboard</span>
      </p>
    </CardContent>
  </Card>
));

const LoadingRow = () => (
  <TableRow>
    <TableCell colSpan={5} className="h-24 text-center opacity-50">
      <div className="flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
      </div>
    </TableCell>
  </TableRow>
);

const EmptyRow = () => (
  <TableRow>
    <TableCell colSpan={5} className="h-24 text-center opacity-50">
      No Todos Found
    </TableCell>
  </TableRow>
);
