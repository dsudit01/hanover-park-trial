"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Library,
  Compass,
  Plus,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/data";
import useThreadStorage from "@/services/useStorage";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { threads, select } = useThreadStorage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: Compass, label: "Discover", href: "/discover" },
    { icon: Library, label: "Library", href: "/library" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-semibold"
            ></motion.span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-[var(--background-tertiary)] transition-colors hidden md:flex"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4 text-[var(--foreground-muted)]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[var(--foreground-muted)]" />
          )}
        </button>
      </div>

      {/* New Thread Button */}
      <div className="px-3 mb-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          {isOpen && <span>New Thread</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
              item.active
                ? "bg-[var(--background-tertiary)] text-[var(--foreground)]"
                : "text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)]"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Recent Threads */}
      {isOpen && (
        <div className="flex-1 mt-6 px-3 overflow-y-auto">
          <h3 className="px-3 text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-2">
            Recent
          </h3>
          <div className="space-y-1">
            {threads.map((thread) => (
              <Link
                key={thread.id}
                href={`/search?q=${encodeURIComponent(thread.title)}`}
                onClick={() => select(thread.id)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors group"
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{thread.title}</p>
                  <p className="text-xs text-[var(--foreground-muted)] opacity-60">
                    {formatDate(new Date(thread.updatedAt))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] md:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[var(--background-secondary)] border-r border-[var(--border)] z-50 md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--background-tertiary)]"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 72 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="hidden md:flex flex-col h-screen bg-[var(--background-secondary)] border-r border-[var(--border)] flex-shrink-0"
      >
        <SidebarContent />
      </motion.aside>
    </>
  );
};

export default Sidebar;
