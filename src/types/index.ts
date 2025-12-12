export interface Source {
  title: string;
  url: string;
  snippet: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  relatedQuestions?: string[];
  timestamp: string;
  isStreaming?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchMode {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserPreferences {
  searchMode: string;
  copilotEnabled: boolean;
}
