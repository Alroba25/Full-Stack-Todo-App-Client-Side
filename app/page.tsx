"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getToken, removeToken } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import NoSSR from "../components/no-ssr";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const handleLogout = useCallback(() => {
    removeToken();
    router.push("/");
    router.refresh();
  }, [router]);
  const token = getToken();
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden">
      {/* Mesh Gradient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[80px] md:blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[80px] md:blur-[120px] -z-10" />

      {/* Navigation Header */}
      <header className="mt-5 h-20 px-8 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-2xl tracking-tight">
            Todo App
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NoSSR>
            {token ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="cursor-pointer w-full justify-start gap-3 text-red-500 hover:text-red-500 hover:bg-red-400/20 transition-all group"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Logout</span>
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
                >
                  Login
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="cursor-pointer bg-primary shadow-lg shadow-primary/20"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </NoSSR>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-32 text-center relative">
        <h1 className="text-5xl md:text-7xl font-heading font-bold max-w-4xl leading-tight mb-6">
          Manage Your Tasks with <span className="text-gradient">Elegance</span>{" "}
          and AI
        </h1>

        <p className="text-lg md:text-xl opacity-60 max-w-2xl mb-12 leading-relaxed">
          The most beautiful and powerful way to track your daily progress.
          Built for teams and individuals who value design and speed.
        </p>

        <NoSSR>
          {!token ? (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="cursor-pointer h-14 px-8 text-lg bg-primary hover:scale-105 transition-transform shadow-xl shadow-primary/20 gap-2"
                >
                  Start Building Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="cursor-pointer h-14 px-8 text-lg glass border-white/10 hover:bg-white/5 transition-colors gap-2"
                >
                  Login
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/todo">
                <Button
                  size="lg"
                  className="cursor-pointer h-14 px-8 text-lg bg-primary hover:scale-105 transition-transform shadow-xl shadow-primary/20 gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </NoSSR>

        {/* Floating Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full">
          <div className="glass-card p-8 rounded-3xl text-left border-white/5 group hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-sm opacity-50 leading-relaxed">
              Optimized for speed. Manage hundreds of tasks without ever feeling
              a lag.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-left border-white/5 group hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Enterprise Security</h3>
            <p className="text-sm opacity-50 leading-relaxed">
              Your data is encrypted and stored securely. We value your privacy
              above all.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl text-left border-white/5 group hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Powered</h3>
            <p className="text-sm opacity-50 leading-relaxed">
              Smart task prioritization and automated scheduling to keep you on
              track.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer privacy={false} showAll={true} />
    </div>
  );
}
