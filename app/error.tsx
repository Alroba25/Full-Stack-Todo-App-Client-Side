"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="glass-card max-w-md w-full p-10 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
          <AlertTriangle className="w-10 h-10 text-rose-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Oops! Something went wrong
          </h1>
          <p className="text-sm opacity-60 leading-relaxed">
            We encountered an unexpected error while processing your request.
            Don't worry, we're on it!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => reset()}
            className="flex-1 gap-2 bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/" className="flex-1">
            <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {error.digest && (
          <p className="text-[10px] opacity-30 font-mono tracking-tighter">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      {/* Background Mesh */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-30">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-rose-900 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[35%] h-[35%] bg-indigo-900 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
