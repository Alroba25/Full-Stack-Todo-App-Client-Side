import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { memo } from "react";

interface StatItem {
  title: string;
  value: string | number;
  description: string;
  icon: any;
  color: string;
}

function AdminStatsComponent({ users = [], todos = [] }: { users?: any[]; todos?: any[] }) {
  const completedTodos = todos.filter(t => t.isCompleted || t.status === "Completed").length;
  const completionRate = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;
  
  const stats: StatItem[] = [
    {
      title: "Total Users",
      value: users?.length || 0,
      description: "+12% from last month",
      icon: Users,
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "Active Todos",
      value: todos?.length || 0,
      description: "+5% from last week",
      icon: Clock,
      color: "from-amber-500/20 to-amber-500/5",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      description: `${completedTodos} tasks completed`,
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-emerald-500/5",
    },
    {
      title: "System Alerts",
      value: "3",
      description: "Requires attention",
      icon: ShieldAlert,
      color: "from-rose-500/20 to-rose-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="glass-card border-none overflow-hidden group">
            <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium opacity-60">
                {stat.title}
              </CardTitle>
              <Icon className="w-4 h-4 opacity-40" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <p className="text-xs opacity-50 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export const AdminStats = memo(AdminStatsComponent);
