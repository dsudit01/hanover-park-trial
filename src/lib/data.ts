export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "Today";
  } else if (days === 1) {
    return "Yesterday";
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
};

export const trendingTopics = [
  { icon: "🤖", label: "AI & Machine Learning" },
  { icon: "💻", label: "Programming" },
  { icon: "🔬", label: "Science & Research" },
  { icon: "📈", label: "Finance & Crypto" },
  { icon: "🎮", label: "Gaming & Tech" },
  { icon: "🌍", label: "World News" },
];

export const searchModes = [
  { id: "all", name: "All", icon: "🌐", description: "Search the entire web" },
  {
    id: "academic",
    name: "Academic",
    icon: "📚",
    description: "Search scholarly articles",
  },
  {
    id: "writing",
    name: "Writing",
    icon: "✍️",
    description: "Help with writing tasks",
  },
  {
    id: "wolfram",
    name: "Wolfram|Alpha",
    icon: "🔢",
    description: "Computational answers",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    description: "Search video content",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: "💬",
    description: "Search Reddit discussions",
  },
];
