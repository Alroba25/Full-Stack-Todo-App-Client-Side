"use client";

import { useState, useMemo, useCallback, useEffect, memo } from "react";
import Sidebar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile, getToken } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Profile {
  name: string;
  email: string;
  role: string;
}

// Memoized individual day cell for high performance
const DayCell = memo(({ 
  date, 
  isSelected, 
  isToday, 
  onClick 
}: { 
  date: Date | null, 
  isSelected: boolean, 
  isToday: boolean, 
  onClick: (d: Date) => void 
}) => {
  if (!date) return <div className="w-full h-full opacity-0" />;

  return (
    <div className="aspect-square relative">
      <button
        onClick={() => onClick(date)}
        className={`w-full h-full rounded-xl flex flex-col items-center justify-center gap-1 transition-all relative group
          ${isSelected ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105 z-10" : "hover:bg-white/5 opacity-80 hover:opacity-100"}
          ${isToday && !isSelected ? "border border-primary/50 text-primary" : ""}
        `}
      >
        <span className="text-lg font-bold">
          {date.getDate()}
        </span>

        {/* Dot indicator for tasks (Static for UI Demo) */}
        {date.getDate() % 3 === 0 && (
          <div
            className={`w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-primary"}`}
          />
        )}
      </button>
    </div>
  );
});

DayCell.displayName = "DayCell";

export default function CalendarPage() {
  const router = useRouter();
  const token = getToken();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentDate]);

  const nextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }, []);

  const isSelected = useCallback((date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  }, [selectedDate]);

  const profileHandler = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      if (res) setProfile(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    profileHandler();
  }, [token, router, profileHandler]);

  const monthName = useMemo(() => 
    currentDate.toLocaleString("default", { month: "long" }), 
    [currentDate]
  );

  const isAdmin = useMemo(() => profile?.role === "admin", [profile?.role]);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-transparent overflow-hidden">
      <Sidebar isAdmin={isAdmin} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar onAddSuccess={() => {}} />

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Calendar Control Card */}
            <Card className="flex-1 glass-card border-none overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-6">
                <div className="space-y-1">
                  <CardTitle className="text-3xl md:text-4xl font-black tracking-tighter bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent flex items-center gap-2">
                    <CalendarIcon className="w-8 h-8 text-primary" />
                    {monthName} {currentDate.getFullYear()}
                  </CardTitle>
                  <p className="text-sm opacity-50">
                    View and manage your schedule
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth} className="glass border-white/10">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth} className="glass border-white/10">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-xs font-bold opacity-30 uppercase tracking-widest py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((date, index) => (
                    <DayCell 
                      key={index} 
                      date={date} 
                      isSelected={date ? isSelected(date) : false} 
                      isToday={date ? isToday(date) : false} 
                      onClick={handleDateClick} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Side Panel: Selected Date Details */}
            <div className="w-full md:w-80 space-y-6">
              <ScheduleCard selectedDate={selectedDate} />

              {/* Tips Section */}
              <div className="p-6 rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 border border-white/10">
                <h4 className="text-sm font-bold mb-2">Productivity Tip</h4>
                <p className="text-xs opacity-60 leading-relaxed">
                  Focus on your "Big Three" tasks for the day to maximize your
                  efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ScheduleCard = memo(({ selectedDate }: { selectedDate: Date }) => (
  <Card className="glass-card border-none">
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-400" />
        Schedule for {selectedDate.getDate()}{" "}
        {selectedDate.toLocaleString("default", { month: "short" })}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors group cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">High Priority</span>
          <AlertCircle className="w-3 h-3 text-amber-500" />
        </div>
        <p className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">Client Project Review</p>
        <p className="text-[11px] opacity-40">10:00 AM - 11:30 AM</p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/20 transition-colors group cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Completed</span>
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
        </div>
        <p className="text-sm font-medium mb-1 opacity-40 line-through">Daily Team Standup</p>
        <p className="text-[11px] opacity-20">09:00 AM</p>
      </div>

      <Button className="w-full gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20">
        Add Event
      </Button>
    </CardContent>
  </Card>
));

ScheduleCard.displayName = "ScheduleCard";
