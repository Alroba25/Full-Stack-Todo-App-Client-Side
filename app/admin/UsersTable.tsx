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
import { MoreHorizontal, Edit, Trash2, Shield, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getProfile, makeRoleAdmin, removeUser } from "@/lib/utils";
import { useEffect, useState, memo } from "react";

function UsersTableComponent({
  users = [],
  fetchData,
}: {
  users: any[];
  fetchData: () => void;
}) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const profile = await getProfile();
      if (profile) {
        setCurrentUserId(profile._id || profile.id);
      }
    };
    fetchCurrentUser();
  }, []);
  const handleEdit = async (userName: string, userId: string) => {
    await makeRoleAdmin(userId);
    await toast.info(`Editing user: ${userName}`, {
      description: "This feature will be connected to the backend soon.",
    });
    fetchData();
  };

  const handleDelete = async (userName: string, userId: string) => {
    await removeUser(userId);
    await toast.error(`Deleting user: ${userName}`, {
      description: "Are you sure? This action cannot be undone.",
    });
    fetchData();
  };

  return (
    <div className="rounded-xl border border-white/5 bg-white/5 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="hover:bg-transparent border-white/5">
            <TableHead className="w-[250px] text-xs font-semibold uppercase tracking-wider opacity-50">
              User
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider opacity-50">
              Role
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
          {users?.length > 0 ? (
            users.map((user) => (
              <TableRow
                key={user._id || user.id}
                className="group border-white/5 hover:bg-white/5 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs opacity-50">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.role?.toLowerCase() === "admin" ? (
                      <Shield className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 opacity-40" />
                    )}
                    <span className="text-sm capitalize">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        user.status?.toLowerCase() === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : user.status?.toLowerCase() === "inactive"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }
                    `}
                  >
                    {user.status || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {currentUserId !== (user._id || user.id) ? (
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
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5" />
                        {user.role !== "admin" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleEdit(user.name, user.id || user._id)
                            }
                            className="gap-2 cursor-pointer"
                          >
                            <Shield className="w-3.5 h-3.5" /> Make Admin
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem
                          onClick={() =>
                            handleDelete(user.name, user.id || user._id)
                          }
                          className="gap-2 text-rose-500 focus:bg-rose-500/10 focus:text-rose-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <p className="text-center text-xs opacity-50">You</p>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center opacity-50">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const UsersTable = memo(UsersTableComponent);
