import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { useConversation } from "../states/conversation";
import { useChatLoading } from "../states/chatLoading";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const MessagesArea = () => {
  const {
    conversation: { messages },
  } = useConversation();

  const { isTyping } = useChatLoading();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollArea className="flex-1 p-4 h-[calc(85vh-140px)]">
      <div className="space-y-4 pb-4">
        {messages.map((message, index) => (
          <div
            key={`message-response-${index}`}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted border border-border"
              }`}
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                <ReactMarkdown
                  children={message.content}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted border border-border">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse delay-150"></div>
                <div className="h-2 w-2 rounded-full bg-foreground/40 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
