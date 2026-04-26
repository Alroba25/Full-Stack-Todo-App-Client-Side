"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-md">
      {/* Premium Loader Animation */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-4 border-4 border-emerald-500/30 rounded-full animate-pulse"></div>
      </div>
      
      <div className="mt-8 space-y-2 text-center">
        <h2 className="text-xl font-heading font-bold tracking-widest text-white animate-pulse">
          LOADING
        </h2>
        <p className="text-sm text-white/40 font-medium tracking-tight">
          Preparing your awesome dashboard...
        </p>
      </div>

      {/* Decorative Mesh Background for Loading */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-20">
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute top-[60%] right-[10%] w-[35%] h-[35%] bg-emerald-600 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
