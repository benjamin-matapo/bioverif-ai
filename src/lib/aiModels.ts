export interface AIModelConfig {
  id: "chatgpt" | "gemini" | "claude" | "copilot" | "deepseek" | "grok";
  displayName: string;
  baseUrl: string;
  promptUrl: (question: string) => string;
  color: string;
  dotColor: string;
  supportsPromptUrl: boolean;
}

export const AI_MODELS: AIModelConfig[] = [
  {
    id: "chatgpt",
    displayName: "ChatGPT",
    baseUrl: "https://chat.openai.com",
    promptUrl: (q) => "https://chat.openai.com/?q=" + encodeURIComponent(q),
    color: "border-l-emerald-500",
    dotColor: "bg-emerald-500",
    supportsPromptUrl: true
  },
  {
    id: "gemini",
    displayName: "Gemini",
    baseUrl: "https://gemini.google.com",
    promptUrl: (q) => "https://gemini.google.com/app?q=" + encodeURIComponent(q),
    color: "border-l-blue-500",
    dotColor: "bg-blue-500",
    supportsPromptUrl: true
  },
  {
    id: "claude",
    displayName: "Claude",
    baseUrl: "https://claude.ai",
    promptUrl: (q) => "https://claude.ai/new?q=" + encodeURIComponent(q),
    color: "border-l-violet-500",
    dotColor: "bg-violet-500",
    supportsPromptUrl: true
  },
  {
    id: "copilot",
    displayName: "Copilot",
    baseUrl: "https://copilot.microsoft.com",
    promptUrl: (q) => "https://copilot.microsoft.com/?q=" + encodeURIComponent(q),
    color: "border-l-sky-500",
    dotColor: "bg-sky-500",
    supportsPromptUrl: true
  },
  {
    id: "deepseek",
    displayName: "DeepSeek",
    baseUrl: "https://chat.deepseek.com",
    promptUrl: (q) => "https://chat.deepseek.com",
    color: "border-l-rose-500",
    dotColor: "bg-rose-500",
    supportsPromptUrl: false
  },
  {
    id: "grok",
    displayName: "Grok",
    baseUrl: "https://grok.com",
    promptUrl: (q) => "https://grok.com/?q=" + encodeURIComponent(q),
    color: "border-l-amber-500",
    dotColor: "bg-amber-500",
    supportsPromptUrl: true
  }
];

export function getModelConfig(id: string): AIModelConfig | undefined {
  return AI_MODELS.find(model => model.id === id);
}
