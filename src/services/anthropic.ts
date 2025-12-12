import Anthropic from "@anthropic-ai/sdk";
import { SEARCH_PROMPT } from "./prompts";
import { Message } from "@anthropic-ai/sdk/resources";

let anthropic: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropic) {
    anthropic = new Anthropic({
      apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  return anthropic;
}

function parseJSONResponse(text: string): unknown {
  // Strip markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return JSON.parse(cleaned.trim());
}

interface SearchResult {
  summary: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  relatedQuestions: string[];
}
export async function getSearchResults(
  query: string,
  messages?: Message[]
): Promise<SearchResult> {
  const prompt = SEARCH_PROMPT.replace("{query}", query);

  const response = await getClient().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: prompt,
      },
      ...(messages ?? []),
    ],
  });

  const textContent = response.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return parseJSONResponse(textContent.text) as SearchResult;
}
