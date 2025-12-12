'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingSkeleton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-[var(--foreground-muted)]">Answer</span>
        <div className="loading-dots flex gap-1 ml-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </div>
      </div>

      {/* Sources Skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-[var(--foreground-muted)]">Sources</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex flex-col p-3 bg-[var(--background-tertiary)] rounded-xl border border-[var(--border)] min-w-[200px] max-w-[240px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-[var(--background-secondary)] animate-shimmer" />
                <div className="h-3 w-20 rounded bg-[var(--background-secondary)] animate-shimmer" />
              </div>
              <div className="h-4 w-full rounded bg-[var(--background-secondary)] animate-shimmer mb-1" />
              <div className="h-4 w-3/4 rounded bg-[var(--background-secondary)] animate-shimmer mb-2" />
              <div className="h-3 w-full rounded bg-[var(--background-secondary)] animate-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-[var(--background-tertiary)] animate-shimmer" />
        <div className="h-4 w-11/12 rounded bg-[var(--background-tertiary)] animate-shimmer" />
        <div className="h-4 w-10/12 rounded bg-[var(--background-tertiary)] animate-shimmer" />
        <div className="h-4 w-full rounded bg-[var(--background-tertiary)] animate-shimmer" />
        <div className="h-4 w-9/12 rounded bg-[var(--background-tertiary)] animate-shimmer" />
        <div className="h-4 w-11/12 rounded bg-[var(--background-tertiary)] animate-shimmer" />
        <div className="h-4 w-8/12 rounded bg-[var(--background-tertiary)] animate-shimmer" />
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
