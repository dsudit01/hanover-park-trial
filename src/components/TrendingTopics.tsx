'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { trendingTopics } from '@/lib/data';

interface TrendingTopicsProps {
  onTopicClick: (topic: string) => void;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ onTopicClick }) => {
  return (
    <div className="w-full max-w-3xl mt-8">
      <div className="flex flex-wrap justify-center gap-2">
        {trendingTopics.map((topic, index) => (
          <motion.button
            key={topic.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onTopicClick(topic.label)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--background-tertiary)] transition-all text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            <span>{topic.icon}</span>
            <span>{topic.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
