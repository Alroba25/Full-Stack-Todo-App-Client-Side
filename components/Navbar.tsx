"use client";

import { Search, Menu, LayoutDashboard, Clock, Calendar, User, LogOut, CheckCircle2, Shield } from "lucide-react";
import { Input } from "./ui/input";
import { AddTaskDialog } from "./AddTaskDialog";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { removeToken, getProfile } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Navbar({ 
  onAddSuccess, 
  searchValue, 
  onSearch 
}: { 
  onAddSuccess: any, 
  searchValue?: string, 
  onSearch?: (val: string) => void 
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const profile = await getProfile();
      if (profile?.role === "admin") {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/todo", color: "text-primary" },
    { label: "Recently Added", icon: Clock, href: "/recent", color: "text-blue-400" },
    { label: "Calendar", icon: Calendar, href: "/calendar", color: "text-purple-400" },
    { label: "Profile", icon: User, href: "/profile", color: "text-emerald-400" },
    ...(isAdmin ? [{ label: "Admin", icon: Shield, href: "/admin", color: "text-rose-400" }] : []),
  ];

  return (
    <header className="w-full h-20 bg-linear-to-r from-[#1a1a1a] to-[#a4a3a6]/80 border-b border-white/5 px-4 md:px-8 flex items-center justify-between gap-4 shadow-2xl">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="glass border-white/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass border-white/10 w-72 p-6 flex flex-col gap-8">
              <SheetHeader>
                <Link href="/">
                  <SheetTitle className="flex items-center gap-3 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                      <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-white">
                      Todo App
                    </span>
                  </SheetTitle>
                </Link>
              </SheetHeader>

              <nav className="flex flex-col gap-2 mt-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-4 h-12 transition-all ${
                          active 
                            ? "bg-white/10 opacity-100 text-white" 
                            : "opacity-60 hover:opacity-100 hover:bg-white/5"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${item.color} ${active ? "scale-110" : ""}`} />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto pb-8 border-t border-white/5 pt-6">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start gap-4 text-rose-500 hover:bg-rose-500/10 h-12 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar - Hidden on extra small screens if needed, but here it's flex-1 */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
          <Input
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => onSearch?.(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 transition-colors h-10 w-[200px] md:w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <AddTaskDialog onAddSuccess={onAddSuccess} />
      </div>
    </header>
  );
}
