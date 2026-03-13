"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Lawrence's digital twin. Ask me about his career journey, roles, education, certifications, and skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();
    if (!message || loading) {
      return;
    }

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: message },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/digital-twin-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          messages: nextMessages.slice(-10),
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        error?: string;
        details?: string;
      };

      if (!response.ok || !data.reply) {
        const errorText = data.error ?? "Unable to get a response right now.";
        const details = data.details ? ` ${data.details}` : "";
        setError(`${errorText}${details}`);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply as string },
      ]);
    } catch {
      setError("Network error while contacting the digital twin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="relative border-t border-white/5 py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Chat with my <span className="text-cyan-400">digital twin</span>
        </h2>
        <p className="mt-3 text-slate-400">
          Ask questions about my background, leadership, engineering experience,
          and learning journey.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto max-w-[90%] border border-cyan-500/30 bg-cyan-500/10 text-cyan-100"
                    : "mr-auto max-w-[90%] border border-white/10 bg-[#0d1117] text-slate-200"
                }`}
              >
                <p className="mb-1 font-mono text-xs uppercase tracking-wide text-slate-400">
                  {message.role === "user" ? "You" : "Digital Twin"}
                </p>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[90%] rounded-xl border border-white/10 bg-[#0d1117] px-4 py-3 text-sm text-slate-300">
                Thinking...
              </div>
            )}
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <form
            onSubmit={onSubmit}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question about Lawrence's career..."
              className="w-full rounded-xl border border-white/15 bg-[#0a0c10] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/60"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex items-center justify-center rounded-xl border border-cyan-500/50 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
