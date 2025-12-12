'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Newspaper,
  Cpu,
  FlaskConical,
  Briefcase,
  Gamepad2,
  Film,
  Music,
  Dumbbell,
  Leaf,
  ArrowRight,
} from 'lucide-react';
import { Sidebar } from '@/components';

const categories = [
  { id: 'trending', name: 'Trending', icon: TrendingUp, color: 'from-orange-400 to-red-500' },
  { id: 'news', name: 'Top News', icon: Newspaper, color: 'from-blue-400 to-indigo-500' },
  { id: 'tech', name: 'Technology', icon: Cpu, color: 'from-cyan-400 to-teal-500' },
  { id: 'science', name: 'Science', icon: FlaskConical, color: 'from-purple-400 to-pink-500' },
  { id: 'business', name: 'Business', icon: Briefcase, color: 'from-emerald-400 to-green-500' },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'from-violet-400 to-purple-500' },
  { id: 'entertainment', name: 'Entertainment', icon: Film, color: 'from-rose-400 to-red-500' },
  { id: 'music', name: 'Music', icon: Music, color: 'from-amber-400 to-orange-500' },
  { id: 'sports', name: 'Sports', icon: Dumbbell, color: 'from-lime-400 to-green-500' },
  { id: 'health', name: 'Health', icon: Leaf, color: 'from-teal-400 to-cyan-500' },
];

const trendingQueries = [
  {
    id: '1',
    query: 'What are the latest advancements in AI in 2025?',
    category: 'Technology',
    views: '125K',
  },
  {
    id: '2',
    query: 'How does quantum computing work?',
    category: 'Science',
    views: '89K',
  },
  {
    id: '3',
    query: 'Best programming languages to learn in 2025',
    category: 'Technology',
    views: '156K',
  },
  {
    id: '4',
    query: 'What is the future of electric vehicles?',
    category: 'Technology',
    views: '72K',
  },
  {
    id: '5',
    query: 'How to improve mental health naturally?',
    category: 'Health',
    views: '98K',
  },
  {
    id: '6',
    query: 'What are the effects of climate change?',
    category: 'Science',
    views: '145K',
  },
];

export default function DiscoverPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('trending');

  const handleQueryClick = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Discover</h1>
            <p className="text-[var(--foreground-muted)]">
              Explore trending topics and popular searches
            </p>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    selectedCategory === category.id
                      ? 'border-[var(--accent)] bg-[var(--accent-light)]'
                      : 'border-[var(--border)] bg-[var(--background-secondary)] hover:border-[var(--accent)] hover:bg-[var(--background-tertiary)]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                  >
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trending Queries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">Trending Now</h2>
            <div className="grid gap-3">
              {trendingQueries.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  onClick={() => handleQueryClick(item.query)}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--background-tertiary)] transition-all text-left"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--background-tertiary)] text-[var(--foreground-muted)] font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {item.query}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {item.category}
                      </span>
                      <span className="text-xs text-[var(--foreground-muted)]">
                        {item.views} searches
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Topics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <h2 className="text-lg font-semibold mb-4">Featured Topics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'AI & Machine Learning',
                  description: 'Explore the latest in artificial intelligence',
                  gradient: 'from-cyan-500 to-blue-600',
                  queries: ['GPT-4 capabilities', 'AI in healthcare', 'Machine learning basics'],
                },
                {
                  title: 'Space Exploration',
                  description: 'Discover the mysteries of the universe',
                  gradient: 'from-purple-500 to-indigo-600',
                  queries: ['Mars missions', 'James Webb discoveries', 'SpaceX Starship'],
                },
                {
                  title: 'Climate & Environment',
                  description: 'Understanding our changing world',
                  gradient: 'from-green-500 to-emerald-600',
                  queries: ['Climate change effects', 'Renewable energy', 'Carbon capture'],
                },
              ].map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4`}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                  <p className="text-sm text-[var(--foreground-muted)] mb-4">
                    {topic.description}
                  </p>
                  <div className="space-y-2">
                    {topic.queries.map((query) => (
                      <button
                        key={query}
                        onClick={() => handleQueryClick(query)}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors"
                      >
                        → {query}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
