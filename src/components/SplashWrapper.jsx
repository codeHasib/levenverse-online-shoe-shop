"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./shared/SplashScreen";

export default function SplashWrapper({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  // Optional: Use sessionStorage so it only shows once per session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("seen-splash");
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("seen-splash", "true");
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleComplete} />}
      {/* 
         Even while splash is showing, the children (your server content) 
         are already in the DOM, preserving SEO and speed.
      */}
      <div className={showSplash ? "hidden" : "block"}>{children}</div>
    </>
  );
}
