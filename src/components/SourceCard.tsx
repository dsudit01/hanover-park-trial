'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Source } from '@/types';

interface SourceCardProps {
  source: Source;
  index: number;
}

const SourceCard: React.FC<SourceCardProps> = ({ source, index }) => {
  const getFaviconUrl = (domain: string) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  return (
    <motion.a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col p-3 bg-[var(--background-tertiary)] rounded-xl border border-[var(--border)] hover:border-[var(--accent)] transition-all hover-lift min-w-[200px] max-w-[240px]"
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="flex items-center justify-center w-5 h-5 rounded bg-[var(--background-secondary)] flex-shrink-0">
          <img
            src={getFaviconUrl(source.domain)}
            alt=""
            className="w-3.5 h-3.5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <span className="text-xs text-[var(--foreground-muted)] truncate flex-1">
          {source.domain}
        </span>
        <span className="flex items-center justify-center w-5 h-5 rounded bg-[var(--accent-light)] text-[var(--accent)] text-xs font-semibold flex-shrink-0">
          {index + 1}
        </span>
      </div>
      <h4 className="text-sm font-medium text-[var(--foreground)] line-clamp-2 mb-1 group-hover:text-[var(--accent)] transition-colors">
        {source.title}
      </h4>
      <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
        {source.snippet}
      </p>
    </motion.a>
  );
};

interface SourcesListProps {
  sources: Source[];
}

export const SourcesList: React.FC<SourcesListProps> = ({ sources }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-[var(--foreground-muted)]">Sources</span>
        <span className="px-2 py-0.5 rounded-full bg-[var(--background-tertiary)] text-xs text-[var(--foreground-muted)]">
          {sources.length}
        </span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {sources.map((source, index) => (
          <SourceCard key={source.id} source={source} index={index} />
        ))}
      </div>
    </div>
  );
};

interface SourcesCompactProps {
  sources: Source[];
}

export const SourcesCompact: React.FC<SourcesCompactProps> = ({ sources }) => {
  const getFaviconUrl = (domain: string) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {sources.slice(0, 5).map((source, index) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--background-tertiary)] hover:bg-[var(--border)] transition-colors"
        >
          <img
            src={getFaviconUrl(source.domain)}
            alt=""
            className="w-3.5 h-3.5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-xs text-[var(--foreground-muted)]">{source.domain}</span>
          <span className="flex items-center justify-center w-4 h-4 rounded bg-[var(--accent-light)] text-[var(--accent)] text-[10px] font-semibold">
            {index + 1}
          </span>
        </a>
      ))}
      {sources.length > 5 && (
        <span className="text-xs text-[var(--foreground-muted)]">
          +{sources.length - 5} more
        </span>
      )}
    </div>
  );
};

export default SourceCard;
