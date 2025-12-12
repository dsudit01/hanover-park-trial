import { Message } from "@/types";

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "message_threads_hanover_trial_1";

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Get all threads from localStorage
export const getThreads = (): Thread[] => {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading threads from localStorage:", error);
    return [];
  }
};

// Save all threads to localStorage
export const saveThreads = (threads: Thread[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  } catch (error) {
    console.error("Error saving threads to localStorage:", error);
  }
};

// Get a single thread by ID
export const getThread = (threadId: string): Thread | null => {
  const threads = getThreads();
  return threads.find((t) => t.id === threadId) || null;
};

// Create a new thread
export const createThread = (
  title: string,
  initialMessage?: Message
): Thread => {
  const now = new Date().toISOString();

  const newThread: Thread = {
    id: generateId(),
    title,
    messages: initialMessage ? [initialMessage] : [],
    createdAt: now,
    updatedAt: now,
  };

  const threads = getThreads();
  threads.unshift(newThread); // Add to beginning
  saveThreads(threads);

  return newThread;
};

// Update a thread
export const updateThread = (
  threadId: string,
  updates: Partial<Thread>
): Thread | null => {
  const threads = getThreads();
  const index = threads.findIndex((t) => t.id === threadId);

  if (index === -1) return null;

  threads[index] = {
    ...threads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveThreads(threads);
  return threads[index];
};

// Delete a thread
export const deleteThread = (threadId: string): boolean => {
  const threads = getThreads();
  const filtered = threads.filter((t) => t.id !== threadId);

  if (filtered.length === threads.length) return false;

  saveThreads(filtered);
  return true;
};

// Add a message to a thread
export const addMessage = (
  threadId: string,
  message: Omit<Message, "id" | "timestamp">
): Message | null => {
  const threads = getThreads();
  const index = threads.findIndex((t) => t.id === threadId);

  if (index === -1) return null;

  const newMessage: Message = {
    ...message,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };

  threads[index].messages.push(newMessage);
  threads[index].updatedAt = new Date().toISOString();

  // Update title from first user message if not set
  if (threads[index].title === "New Thread" && message.role === "user") {
    threads[index].title =
      message.content.slice(0, 50) + (message.content.length > 50 ? "..." : "");
  }

  saveThreads(threads);
  return newMessage;
};

// Clear all threads
export const clearAllThreads = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};

// Search threads by title or content
export const searchThreads = (query: string): Thread[] => {
  const threads = getThreads();
  const lowerQuery = query.toLowerCase();

  return threads.filter((thread) => {
    if (thread.title.toLowerCase().includes(lowerQuery)) return true;
    return thread.messages.some((msg) =>
      msg.content.toLowerCase().includes(lowerQuery)
    );
  });
};

// Get recent threads (sorted by updatedAt)
export const getRecentThreads = (limit: number = 10): Thread[] => {
  const threads = getThreads();
  return threads
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
};
