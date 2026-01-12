interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"}
        `}
      >
        {content}
      </div>
    </div>
  );
}
