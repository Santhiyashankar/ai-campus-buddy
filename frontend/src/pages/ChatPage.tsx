import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Navbar from "../components/Navbarr";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello 👋 How can I help you today?" },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      // ✅ Send JSON body instead of query params
      const res = await api.post("/api/chat", { message: text });

      // Handle backend response
      const content =
        typeof res.data === "string" ? res.data : res.data?.content || "No response";

      setMessages((prev) => [...prev, { role: "assistant", content }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err.response?.data || `⚠️ AI service unavailable (${err.response?.status || "network error"})`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-b from-gray-100 to-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Chat window */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex items-start space-x-2 animate-pulse">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-300 p-4 bg-white">
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>
    </div>
  );
}
