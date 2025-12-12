"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Sidebar, SearchBar, TrendingTopics } from "@/components";

export default function HomePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTopicClick = (topic: string) => {
    router.push(`/search?q=${encodeURIComponent(topic)}`);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/25"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-center"
            >
              Hanover Park
              <span className="block mt-1 gradient-text">Trial!!</span>
            </motion.h1>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full flex justify-center"
          >
            <SearchBar variant="home" autoFocus />
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TrendingTopics onTopicClick={handleTopicClick} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
