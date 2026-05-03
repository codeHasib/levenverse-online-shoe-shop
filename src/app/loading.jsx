"use client";
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      
      {/* 1. THE ACTION AREA */}
      <div className="flex flex-col items-center justify-center space-y-12">
        
        {/* Animated Icon Container */}
        <div className="relative w-20 h-20">
          {/* Subtle Glow Backdrop */}
          <div className="absolute inset-0 bg-[#0070f3]/10 blur-2xl rounded-full animate-pulse" />
          
          {/* Main Icon - Using a simple high-performance SVG */}
          <div className="relative flex items-center justify-center w-full h-full text-[#0070f3] animate-bounce">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        </div>

        {/* 2. THE TEXT SEQUENCE */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-white text-[10px] tracking-[0.5em] uppercase opacity-70">
            Levenverse
          </p>
          <p className="text-[#0070f3] text-[9px] tracking-[0.3em] uppercase animate-pulse">
            Syncing Inventory...
          </p>
        </div>

        {/* 3. THE PROGRESS TRACK */}
        <div className="w-48 h-[1px] bg-neutral-900 relative overflow-hidden">
          <div 
            className="absolute h-full bg-[#0070f3] w-full -translate-x-full animate-[shimmer_2s_infinite]"
            style={{
              animation: 'shimmer 1.5s infinite linear'
            }}
          />
        </div>
      </div>

      {/* Basic Keyframe defined in a standard way that Tailwind understands */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
