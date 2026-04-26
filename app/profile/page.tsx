"use client";
import { getProfile, removeToken, getToken } from "@/lib/utils";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  User,
  Mail,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/SideBar";
interface Profile {
  name: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = getToken();

  const profileHandler = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      if (res) {
        setProfile(res);
      }
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
  const isAdmin = useMemo(() => profile?.role === "admin", [profile?.role]);

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
      {/* Sidebar - Consistent with Dashboard */}
      <Sidebar isAdmin={isAdmin} />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Back Button & Title */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">
                Account Settings
              </h1>
              <p className="text-sm opacity-50">
                Manage your profile and account preferences
              </p>
            </div>
            <div className="mt-5 h-20 px-8 flex items-center justify-between sticky top-0 z-50">
              <Link href="/todo" className="flex items-center gap-2 group">
                <ArrowLeft className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                <span className="font-heading font-bold text-xl tracking-tight">
                  Back to Dashboard
                </span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass-card border-none overflow-hidden relative group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-linear-to-tr from-primary to-emerald-500 p-1">
                      <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center border-4 border-[#1a1a1a]">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-[#1a1a1a]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">
                      {profile?.name || "User Name"}
                    </h3>
                    <p className="text-sm opacity-50">{profile?.email}</p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-primary/20 hover:bg-primary/30 text-primary-foreground border border-primary/20"
                  >
                    Edit Avatar
                  </Button>
                </CardContent>
              </Card>

              {/* Status Section */}
              <div className="glass-card rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-semibold opacity-60 uppercase tracking-wider">
                  Account Status
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-60">Verified</span>
                    <span className="text-emerald-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Yes
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-60">Role</span>
                    <span className="text-primary font-bold">
                      {profile?.role || "User"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-60">Security</span>
                    <span className="text-blue-400">High</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Settings */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs opacity-50">Full Name</Label>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <User className="w-4 h-4 opacity-40" />
                        <span>{profile?.name}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs opacity-50">
                        Email Address
                      </Label>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Mail className="w-4 h-4 opacity-40" />
                        <span>{profile?.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <h4 className="text-md font-semibold">Account Security</h4>
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          className="cursor-pointer w-full justify-center gap-3 glass border-white/5 hover:bg-white/10 h-12"
                        >
                          <Shield className="w-4 h-4 text-blue-400" />
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Card */}
              <Card className="glass-card border-none">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Logged in successfully
                        </p>
                        <p className="text-xs opacity-40">
                          2 hours ago • Chrome on Windows
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Joined Todo App</p>
                        <p className="text-xs opacity-40">
                          3 days ago • Welcome!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
