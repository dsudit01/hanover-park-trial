'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  MessageSquare,
  Trash2,
  MoreHorizontal,
  Clock,
  Filter,
  SortAsc,
} from 'lucide-react';
import { Sidebar } from '@/components';
import { formatDate } from '@/lib/data';

const mockLibraryThreads = [
  {
    id: '1',
    title: 'What is quantum computing and how does it differ from classical computing?',
    preview: 'Quantum computing uses quantum bits or qubits which can exist in multiple states simultaneously...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 5,
  },
  {
    id: '2',
    title: 'Best programming languages to learn in 2024 for beginners',
    preview: 'For beginners in 2024, Python remains the top recommendation due to its readable syntax...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 3,
  },
  {
    id: '3',
    title: 'How does blockchain technology work and what are its applications?',
    preview: 'Blockchain is a distributed ledger technology that records transactions across multiple computers...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    messageCount: 8,
  },
  {
    id: '4',
    title: 'What are the health benefits of intermittent fasting?',
    preview: 'Intermittent fasting has been associated with various health benefits including improved metabolic health...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    messageCount: 4,
  },
  {
    id: '5',
    title: 'Explain the theory of relativity in simple terms',
    preview: "Einstein's theory of relativity consists of two interrelated physics theories...",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    messageCount: 6,
  },
  {
    id: '6',
    title: 'What is the future of renewable energy?',
    preview: 'The future of renewable energy looks promising with continued growth in solar, wind, and other clean technologies...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    messageCount: 2,
  },
];

export default function LibraryPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [threads, setThreads] = useState(mockLibraryThreads);

  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleThreadClick = (thread: typeof mockLibraryThreads[0]) => {
    router.push(`/search?q=${encodeURIComponent(thread.title)}`);
  };

  const handleDeleteThread = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setThreads((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Library</h1>
            <p className="text-[var(--foreground-muted)]">
              Your saved threads and search history
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your threads..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:text-[var(--foreground)] transition-colors">
                <SortAsc className="w-4 h-4" />
                <span className="text-sm">Sort</span>
              </button>
            </div>
          </motion.div>

          {/* Thread Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Threads', value: threads.length, icon: MessageSquare },
              { label: 'This Week', value: threads.filter(t => t.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: Calendar },
              { label: 'Total Messages', value: threads.reduce((acc, t) => acc + t.messageCount, 0), icon: MessageSquare },
              { label: 'Avg. Messages', value: Math.round(threads.reduce((acc, t) => acc + t.messageCount, 0) / threads.length), icon: Clock },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="w-4 h-4 text-[var(--foreground-muted)]" />
                  <span className="text-xs text-[var(--foreground-muted)]">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Threads List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">All Threads</h2>
            <div className="space-y-3">
              {filteredThreads.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-[var(--foreground-muted)] mx-auto mb-4 opacity-50" />
                  <p className="text-[var(--foreground-muted)]">
                    {searchQuery ? 'No threads match your search' : 'No threads yet'}
                  </p>
                </div>
              ) : (
                filteredThreads.map((thread, index) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                    onClick={() => handleThreadClick(thread)}
                    className="group p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                          {thread.title}
                        </h3>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1 line-clamp-2">
                          {thread.preview}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(thread.createdAt)}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {thread.messageCount} messages
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleDeleteThread(thread.id, e)}
                          className="p-2 rounded-lg text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--error)] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
