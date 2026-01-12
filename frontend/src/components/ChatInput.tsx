import { useState } from "react";

interface Props {
  onSend: (msg: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex items-center gap-3 p-4 border-t bg-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Ask anything..."
        className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={send}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
