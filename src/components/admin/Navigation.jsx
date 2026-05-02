"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PlusSquare,
  ShoppingBag,
  Layers,
  LogOut,
  Menu,
  X,
  Star,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function out() {
    signOut();
    redirect("/");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Add Product", href: "/admin/products", icon: PlusSquare },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Categories", href: "/admin/categories", icon: Layers },
    { name: "Reviews", href: "/admin/reviews", icon: Star },
  ];

  const NavLink = ({ item, onClick = () => {} }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-[#0070f3] text-white shadow-[0_0_20px_rgba(0,112,243,0.4)]"
            : "text-neutral-400 hover:text-white hover:bg-neutral-900"
        }`}
      >
        <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
        <span className="font-bold uppercase tracking-widest text-xs">
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-[#0a0a0a] border-r border-neutral-900 flex-col p-6 z-50">
        <div className="mb-12 px-4">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white">
            LEVEN<span className="text-[#0070f3]">VERSE</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        <button
          onClick={out}
          className="flex items-center gap-4 px-6 py-4 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-500/10 rounded-xl transition-all mt-auto"
        >
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </aside>

      {/* --- MOBILE TOP BAR --- */}
      <header className="lg:hidden sticky top-0 left-0 w-full bg-black/80 backdrop-blur-lg border-b border-neutral-900 px-6 py-4 flex justify-between items-center z-40">
        <h1 className="text-xl font-black italic tracking-tighter uppercase text-white">
          LV<span className="text-[#0070f3]">V</span>
        </h1>
        <button onClick={() => setIsOpen(true)} className="text-white">
          <Menu size={28} />
        </button>
      </header>

      {/* --- MOBILE OVERLAY SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] bg-[#0a0a0a] z-[70] p-8 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-500"
                >
                  <X size={32} />
                </button>
              </div>
              <nav className="space-y-4 flex-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    item={item}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </nav>
              <button
                onClick={out}
                className="flex items-center gap-4 px-6 py-4 text-red-500 font-bold uppercase tracking-widest text-xs border border-red-500/20 rounded-xl"
              >
                <LogOut size={22} />
                <span>Sign Out</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MOBILE BOTTOM NAV (Quick Actions) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-neutral-900 px-4 py-3 flex justify-around items-center z-40 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="relative p-3">
              <item.icon
                size={24}
                className={isActive ? "text-[#0070f3]" : "text-neutral-500"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <motion.div
                  layoutId="bottomTab"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0070f3] shadow-[0_0_10px_#0070f3]"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Navigation;
