'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Mic,
  Paperclip,
  Globe,
  BookOpen,
  Pencil,
  Calculator,
  MessageCircle,
  ChevronDown,
  X,
} from 'lucide-react';
import { searchModes } from '@/lib/data';

interface SearchBarProps {
  variant?: 'home' | 'compact';
  initialQuery?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

const modeIcons: Record<string, React.ReactNode> = {
  all: <Globe className="w-4 h-4" />,
  academic: <BookOpen className="w-4 h-4" />,
  writing: <Pencil className="w-4 h-4" />,
  wolfram: <Calculator className="w-4 h-4" />,
  reddit: <MessageCircle className="w-4 h-4" />,
};

const SearchBar: React.FC<SearchBarProps> = ({
  variant = 'home',
  initialQuery = '',
  onSearch,
  autoFocus = false,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedMode, setSelectedMode] = useState('all');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  };

  const currentMode = searchModes.find((m) => m.id === selectedMode) || searchModes[0];

  const isHome = variant === 'home';

  return (
    <div className={`w-full ${isHome ? 'max-w-3xl' : 'max-w-2xl'}`}>
      <form onSubmit={handleSubmit}>
        <div
          className={`relative bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl transition-all duration-200 search-focus ${
            isFocused ? 'border-[var(--accent)]' : ''
          } ${isHome ? 'shadow-2xl shadow-black/20' : 'shadow-lg shadow-black/10'}`}
        >
          {/* Mode Selector (for home variant) */}
          {isHome && (
            <div className="px-4 pt-3 pb-2 border-b border-[var(--border)]">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] transition-colors"
                >
                  {modeIcons[currentMode.id]}
                  <span>{currentMode.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showModeDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showModeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      {searchModes.map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            setSelectedMode(mode.id);
                            setShowModeDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            selectedMode === mode.id
                              ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                              : 'hover:bg-[var(--background-tertiary)]'
                          }`}
                        >
                          <span className="text-lg">{mode.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{mode.name}</p>
                            <p className="text-xs text-[var(--foreground-muted)]">{mode.description}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Search Input */}
          <div className="flex items-start gap-3 p-4">
            {!isHome && (
              <Search className="w-5 h-5 text-[var(--foreground-muted)] mt-0.5 flex-shrink-0" />
            )}
            <textarea
              ref={inputRef}
              value={query}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isHome ? 'Ask anything...' : 'Ask a follow up...'}
              rows={1}
              className="flex-1 bg-transparent text-[var(--foreground)] placeholder-[var(--foreground-muted)] resize-none outline-none text-base leading-relaxed min-h-[24px] max-h-[200px]"
              style={{ height: 'auto' }}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  if (inputRef.current) {
                    inputRef.current.style.height = 'auto';
                    inputRef.current.focus();
                  }
                }}
                className="p-1 rounded-full hover:bg-[var(--background-tertiary)] text-[var(--foreground-muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-lg text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              {isHome && (
                <button
                  type="button"
                  className="p-2 rounded-lg text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={!query.trim()}
              className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
                query.trim()
                  ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] cursor-not-allowed'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Keyboard Hint */}
      {isHome && (
        <p className="text-center text-xs text-[var(--foreground-muted)] mt-4">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--background-tertiary)] font-mono text-xs">Enter</kbd> to search
        </p>
      )}
    </div>
  );
};

export default SearchBar;
