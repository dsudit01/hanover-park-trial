"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar, SearchBar, Message, LoadingSkeleton } from "@/components";
import { Message as MessageType } from "@/types";
import { generateId } from "@/lib/data";
import useThreadStorage from "@/services/useStorage";
import { getSearchResults } from "@/services/anthropic";

function SearchContent() {
  const { create, currentThread, addMessage } = useThreadStorage();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentThread?.messages]);

  const processQuery = async (searchQuery: string) => {
    if (!searchQuery.trim() || isLoading) return;

    // Add user message
    const userMessage: MessageType = {
      id: generateId(),
      role: "user",
      content: searchQuery,
      timestamp: new Date().getTime().toString(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    addMessage(userMessage);
    setIsLoading(true);

    // Simulate API delay
    const results = await getSearchResults(userMessage.content);
    console.log(results);

    // Generate assistant response
    const assistantMessage: MessageType = {
      id: generateId(),
      role: "assistant",
      content: results.summary,
      sources: results.sources,
      relatedQuestions: results.relatedQuestions,
      timestamp: new Date().getTime().toString(),
    };

    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    addMessage(assistantMessage);
    setIsLoading(false);
  };

  // Process initial query
  useEffect(() => {
    if (query && !currentThread) {
      setMessages(create(query).messages);
      processQuery(query);
    }
  }, [query, currentThread, create]);

  const handleSearch = (newQuery: string) => {
    processQuery(newQuery);
  };

  const handleRelatedQuestionClick = (question: string) => {
    processQuery(question);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 flex flex-col h-screen">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8 md:px-8">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                onRelatedQuestionClick={handleRelatedQuestionClick}
              />
            ))}

            {isLoading && <LoadingSkeleton />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Search Input (Bottom) */}
        <div className="border-t border-[var(--border)] bg-[var(--background)]">
          <div className="max-w-4xl mx-auto px-4 py-4 md:px-8">
            <SearchBar
              variant="compact"
              onSearch={handleSearch}
              autoFocus={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen bg-[var(--background)] items-center justify-center">
          <div className="loading-dots flex gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
