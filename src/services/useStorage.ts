import { useState, useEffect, useCallback } from "react";
import {
  addMessage,
  createThread,
  deleteThread,
  getThread,
  getThreads,
  searchThreads,
  Thread,
} from "./storage";
import { Message } from "@/types";

export const useThreadStorage = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [currentThread, setCurrentThread] = useState<Thread | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load threads on mount
  useEffect(() => {
    setThreads(getThreads());
    setIsLoading(false);
  }, []);

  // Create new thread
  const create = useCallback(
    (title: string = "New Thread", initialMessage?: Message) => {
      const thread = createThread(title, initialMessage);
      setThreads((prev) => [thread, ...prev]);
      setCurrentThread(thread);
      return thread;
    },
    []
  );

  // Select a thread
  const select = useCallback((threadId: string) => {
    const thread = getThread(threadId);
    setCurrentThread(thread);
    return thread;
  }, []);

  // Add message to current thread
  const addMsg = useCallback(
    (msg: Message) => {
      if (!currentThread) return null;

      const message = addMessage(currentThread.id, msg);
      if (message) {
        setCurrentThread((prev) =>
          prev ? { ...prev, messages: [...prev.messages, message] } : null
        );
        setThreads(getThreads());
      }
      return message;
    },
    [currentThread]
  );

  // Delete a thread
  const remove = useCallback(
    (threadId: string) => {
      const success = deleteThread(threadId);
      if (success) {
        setThreads((prev) => prev.filter((t) => t.id !== threadId));
        if (currentThread?.id === threadId) {
          setCurrentThread(null);
        }
      }
      return success;
    },
    [currentThread]
  );

  // Search threads
  const search = useCallback((query: string) => {
    return searchThreads(query);
  }, []);

  // Clear current thread selection
  const clearSelection = useCallback(() => {
    setCurrentThread(null);
  }, []);

  return {
    threads,
    currentThread,
    isLoading,
    create,
    select,
    addMessage: addMsg,
    remove,
    search,
    clearSelection,
    refresh: () => setThreads(getThreads()),
  };
};

export default useThreadStorage;
