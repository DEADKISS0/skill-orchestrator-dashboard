type ChatMessage = { role: string; content: string };

type Provider = {
  name: string;
  baseUrl: string;
  model: string;
  apiKey: string;
};

const RETRYABLE = new Set([429, 500, 502, 503, 504]);

function chatUrl(baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, "");
  return base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
}

function getProviders(): Provider[] {
  const providers: Provider[] = [];

  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    providers.push({
      name: "groq",
      baseUrl: "https://api.groq.com/openai/v1",
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      apiKey: groqKey,
    });
  }

  const openrouterKey = process.env.OPENROUTER_API_KEY;
  if (openrouterKey) {
    providers.push({
      name: "openrouter",
      baseUrl: "https://openrouter.ai/api/v1",
      model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.2-3b-instruct:free",
      apiKey: openrouterKey,
    });
  }

  const opencodeKey = process.env.OPENCODE_API_KEY;
  if (opencodeKey) {
    providers.push({
      name: "opencode",
      baseUrl: "https://opencode.ai/zen/v1",
      model: process.env.OPENCODE_MODEL || "deepseek-v4-flash",
      apiKey: opencodeKey,
    });
  }

  return providers;
}

async function callProvider(
  provider: Provider,
  messages: ChatMessage[],
  maxTokens: number,
  temperature: number
): Promise<string | null> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${provider.apiKey}`,
  };
  if (provider.name === "openrouter") {
    headers["HTTP-Referer"] = "https://rr-aliados-mega-dashboard.vercel.app";
    headers["X-Title"] = "RR ALIADOS Mega Dashboard";
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    const resp = await fetch(chatUrl(provider.baseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: provider.model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (resp.ok) {
      const data = await resp.json();
      const content = data.choices?.[0]?.message?.content;
      return typeof content === "string" && content.trim() ? content : null;
    }

    if (RETRYABLE.has(resp.status)) {
      await new Promise((r) => setTimeout(r, 2 ** attempt * 1000));
      continue;
    }
    return null;
  }
  return null;
}

export async function chatCompletion(
  messages: ChatMessage[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<{ content: string | null; provider?: string }> {
  const providers = getProviders();
  if (!providers.length) {
    return { content: null };
  }

  const maxTokens = options?.maxTokens ?? 1024;
  const temperature = options?.temperature ?? 0.7;

  for (const provider of providers) {
    const content = await callProvider(provider, messages, maxTokens, temperature);
    if (content) {
      return { content, provider: provider.name };
    }
  }

  return { content: null };
}
