"use client";

import {
  User,
  LogOut,
  CheckCircle2,
  LayoutDashboard,
  Clock,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { removeToken } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    removeToken();
    router.push("/");
    router.refresh();
  };

  const isActive = (path: string) => pathname === path;

  const navItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/todo",
      iconColor: "text-primary",
    },
    {
      label: "Recently Added",
      icon: Clock,
      href: "/recent",
      iconColor: "text-blue-400",
    },
    {
      label: "Calendar",
      icon: Calendar,
      href: "/calendar",
      iconColor: "text-purple-400",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
      iconColor: "text-emerald-400",
    },
    ...(isAdmin
      ? [
          {
            label: "Admin",
            icon: Shield,
            href: "/admin",
            iconColor: "text-rose-400",
          },
        ]
      : []),
  ];

  return (
    <aside className="w-64 border-r border-white/5 p-6 hidden md:flex flex-col gap-8">
      <Link href="/">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
            <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white">
            Todo App
          </span>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map((item: any) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="w-full">
              <Button
                variant="ghost"
                className={`w-full cursor-pointer justify-start gap-3 font-heading group transition-all ${
                  active
                    ? "bg-white/10 opacity-100 text-white"
                    : "opacity-60 hover:opacity-100 hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-4 h-4 group-hover:scale-110 transition-transform ${item.iconColor} ${active ? "scale-110" : ""}`}
                />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mb-11 mt-auto pt-6 border-t border-white/5">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="cursor-pointer w-full justify-start gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
