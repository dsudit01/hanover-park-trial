'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Share,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
  User,
} from 'lucide-react';
import { Message } from '@/types';
import { SourcesList } from './SourceCard';

interface MessageComponentProps {
  message: Message;
  onRelatedQuestionClick?: (question: string) => void;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
  message,
  onRelatedQuestionClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add inline citation markers to text
  const renderContentWithCitations = (content: string) => {
    // Simple citation pattern - in real app would parse markdown properly
    const parts = content.split(/(\[\d+\])/g);
    return parts.map((part, index) => {
      const citationMatch = part.match(/\[(\d+)\]/);
      if (citationMatch) {
        const num = citationMatch[1];
        return (
          <span key={index} className="citation">
            {num}
          </span>
        );
      }
      return part;
    });
  };

  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 mb-6"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent)] flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-medium">{message.content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Assistant Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-[var(--foreground-muted)]">Answer</span>
        {message.isStreaming && (
          <div className="loading-dots flex gap-1 ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </div>
        )}
      </div>

      {/* Sources */}
      {message.sources && message.sources.length > 0 && (
        <SourcesList sources={message.sources} />
      )}

      {/* Content */}
      <div className="prose max-w-none">
        {message.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            // Bold heading
            return (
              <h3 key={index} className="text-lg font-semibold mt-4 mb-2">
                {paragraph.replace(/\*\*/g, '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
            // List item
            return (
              <ul key={index} className="list-disc list-inside mb-2">
                <li className="text-[var(--foreground)]">
                  {renderContentWithCitations(paragraph.slice(2))}
                </li>
              </ul>
            );
          }
          if (paragraph.match(/^\d+\.\s\*\*/)) {
            // Numbered list with bold
            const match = paragraph.match(/^(\d+)\.\s\*\*(.+?)\*\*\s*[-–]\s*(.+)$/);
            if (match) {
              return (
                <div key={index} className="mb-3">
                  <p className="text-[var(--foreground)]">
                    <span className="font-semibold text-[var(--accent)]">{match[1]}. {match[2]}</span>
                    {' – '}
                    {renderContentWithCitations(match[3])}
                  </p>
                </div>
              );
            }
          }
          return (
            <p key={index} className="mb-3 text-[var(--foreground)] leading-relaxed">
              {renderContentWithCitations(paragraph)}
            </p>
          );
        })}
      </div>

      {/* Related Questions */}
      {message.relatedQuestions && message.relatedQuestions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-[var(--border)]">
          <h4 className="text-sm font-medium text-[var(--foreground-muted)] mb-3">
            Related
          </h4>
          <div className="space-y-2">
            {message.relatedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onRelatedQuestionClick?.(question)}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] text-sm transition-colors flex items-center justify-between group"
              >
                <span>{question}</span>
                <RefreshCw className="w-4 h-4 text-[var(--foreground-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!message.isStreaming && (
        <div className="flex items-center gap-1 mt-4 pt-4 border-t border-[var(--border)]">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => setLiked(liked === true ? null : true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              liked === true
                ? 'text-[var(--success)] bg-[var(--success)]/10'
                : 'text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)]'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>

          <button
            onClick={() => setLiked(liked === false ? null : false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              liked === false
                ? 'text-[var(--error)] bg-[var(--error)]/10'
                : 'text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)]'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>

          <button className="ml-auto p-1.5 rounded-lg text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)] transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MessageComponent;
