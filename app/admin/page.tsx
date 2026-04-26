"use client";

import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { AdminStats } from "@/app/admin/AdminStats";
import { UsersTable } from "@/app/admin/UsersTable";
import { TodosTable } from "@/app/admin/TodosTable";
import { Search, Filter, ShieldCheck, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getAllTodos, getAllUsers, removeAllTodos } from "@/lib/utils";

export default function AdminPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [todoSearch, setTodoSearch] = useState("");

  const handelFetchAdminData = useCallback(async () => {
    const userData = await getAllUsers();
    const todoData = await getAllTodos();
    setAllUsers(userData || []);
    setAllTodos(todoData || []);
  }, []);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(
      (user: any) =>
        user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email?.toLowerCase().includes(userSearch.toLowerCase()),
    );
  }, [allUsers, userSearch]);

  const filteredTodos = useMemo(() => {
    return allTodos.filter(
      (todo: any) =>
        todo.title?.toLowerCase().includes(todoSearch.toLowerCase()) ||
        todo.task?.toLowerCase().includes(todoSearch.toLowerCase()) ||
        todo.user?.name?.toLowerCase().includes(todoSearch.toLowerCase()),
    );
  }, [allTodos, todoSearch]);
  const handleRemoveAllTodos = async () => {
    await removeAllTodos();
    handelFetchAdminData();
  };
  useEffect(() => {
    handelFetchAdminData();
  }, []);

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <Sidebar isAdmin={true} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Navbar onAddSuccess={handelFetchAdminData} />

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter bg-linear-to-b from-white via-white to-white/20 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-rose-500" />
                Admin Command Center
              </h1>
              <p className="text-sm opacity-50 font-medium">
                Manage users, oversee tasks, and monitor system health.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => handleRemoveAllTodos()}
                className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20"
              >
                <Trash2 className="mr-1" />
                Remove All Todos
              </Button>
            </div>
          </div>

          {/* Statistics Grid */}
          <AdminStats todos={allTodos} users={allUsers} />

          {/* Management Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Users Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  User Management
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative w-48 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
                    <Input
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="pl-9 h-9 text-xs glass border-white/5 focus-visible:ring-1 focus-visible:ring-white/20"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 glass border-white/5"
                  >
                    <Filter className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <UsersTable users={filteredUsers} fetchData={handelFetchAdminData} />
            </div>

            {/* Todo Management */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  System-wide Todos
                </h2>
                <div className="flex items-center gap-2">
                  <div className="relative w-48 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40 group-focus-within:opacity-100 group-focus-within:text-primary transition-all" />
                    <Input
                      placeholder="Search todos..."
                      value={todoSearch}
                      onChange={(e) => setTodoSearch(e.target.value)}
                      className="pl-9 h-9 text-xs glass border-white/5 focus-visible:ring-1 focus-visible:ring-white/20"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 glass border-white/5"
                  >
                    <Filter className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <TodosTable todos={filteredTodos} fetchData={handelFetchAdminData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
