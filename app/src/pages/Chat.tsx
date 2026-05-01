import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import Navigation from "@/components/Navigation";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

function generateSessionId() {
  return "chat_" + Math.random().toString(36).substring(2, 15);
}

const SUGGESTED_PROMPTS = [
  "Help me craft a speech",
  "Overcome stage fear",
  "Improve my storytelling",
  "Practice impromptu speaking",
];

export default function Chat() {
  const [sessionId] = useState(() => generateSessionId());
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Speaking Coach. I can help you with public speaking, storytelling, presentations, and building confidence. What would you like to work on today?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = trpc.aiChat.send.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMessage.isPending) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    sendMessage.mutate({ sessionId, message: userMessage });
  };

  const handlePromptClick = (prompt: string) => {
    if (sendMessage.isPending) return;
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    sendMessage.mutate({ sessionId, message: prompt });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <Navigation />

      {/* Chat Header */}
      <div className="pt-[72px] bg-[#0F1D32] border-b border-white/5">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#C9A84C]/15 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-[#C9A84C]" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base">AI Speaking Coach</h1>
            <p className="text-white/40 text-xs">Powered by Moonshot AI</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-[#C9A84C]/20"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4 text-[#C9A84C]" />
                ) : (
                  <Bot className="h-4 w-4 text-[#C9A84C]" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[#C9A84C] text-[#0A1628]"
                    : "bg-white/5 border border-white/10 text-white/80"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {sendMessage.isPending && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-[#C9A84C]" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <Loader2 className="h-4 w-4 text-[#C9A84C] animate-spin" />
                  <span className="text-white/40 text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/5 bg-[#0F1D32]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] hover:border-[#C9A84C]/20 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your speaking coach..."
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/20"
            />
            <button
              type="submit"
              disabled={sendMessage.isPending || !input.trim()}
              className="rounded-xl bg-[#C9A84C] px-4 py-3 text-[#0A1628] hover:bg-[#D4BA6A] transition-all disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
