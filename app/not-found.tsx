"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Mesh Gradient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] -z-10 animate-pulse [animation-delay:2s]" />

      <div className="max-w-2xl w-full mx-auto p-12 text-center space-y-8 relative overflow-hidden group">
        {/* Decorative Sparkle */}
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* 404 Illustration Area */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary blur-2xl opacity-20 animate-pulse" />
          <h1 className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter bg-linear-to-b from-white to-white/20 bg-clip-text text-transparent relative">
            404
          </h1>
        </div>

        <div className="space-y-4 relative">
          <div className="flex items-center justify-center gap-3 text-primary">
            <FileQuestion className="w-6 h-6" />
            <h2 className="text-2xl md:text-3xl font-black leading-none tracking-tighter bg-linear-to-b from-white to-white/20 bg-clip-text text-transparent relative">
              Page Not Found
            </h2>
          </div>
          <p
            style={{ letterSpacing: "1px", lineHeight: "1.8rem" }}
            className="my-6 text-sm md:text-base font-black leading-none tracking-tighter bg-linear-to-b from-white to-white/20 bg-clip-text text-transparent relative"
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative">
          <Button
            variant="outline"
            className="w-full sm:w-auto gap-2 glass border-white/10 hover:bg-linear-to-br hover:from-white/50 hover:to-white/10 hover:scale-105 transition-transform h-12 px-8"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Link href="/">
            <Button className="w-full sm:w-auto gap-2 bg-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform h-12 px-8">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Subtle background text */}
        <div className="absolute -bottom-10 -right-10 text-[100px] font-black opacity-[0.02] select-none pointer-events-none italic">
          LOST?
        </div>
      </div>

      {/* Floating particles (Decorative) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] animate-bounce" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full blur-[3px] animate-bounce [animation-delay:1s]" />
    </div>
  );
}
