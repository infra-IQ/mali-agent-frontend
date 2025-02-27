import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
}

export const MessagesArea = () => {
     const [inputValue, setInputValue] = useState("");
     const [messages, setMessages] = useState<Message[]>([
            {
              id: "1",
              content: "Hello! I'm your AI assistant. How can I help you today?",
              role: "assistant",
              timestamp: new Date(),
            },
     ]);
     const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
     };
     const [isTyping, setIsTyping] = useState(false);
     const messagesEndRef = useRef<HTMLDivElement>(null);
     
       useEffect(() => {
         scrollToBottom();
       }, [messages]);
     
       const scrollToBottom = () => {
         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
       };

       const handleSendMessage = () => {
        if (!inputValue.trim()) return;
    
        const newMessage: Message = {
          id: Date.now().toString(),
          content: inputValue,
          role: "user",
          timestamp: new Date(),
        };
    
        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        setIsTyping(true);
    
        // Simulate AI thinking and responding
        setTimeout(() => {
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: generateResponse(inputValue),
            role: "assistant",
            timestamp: new Date(),
          };
    
          setMessages((prev) => [...prev, responseMessage]);
          setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (input: string) => {
        // Simple response generation based on input keywords
        const inputLower = input.toLowerCase();
    
        if (inputLower.includes("hello") || inputLower.includes("hi")) {
          return "Hello! It's nice to chat with you. How can I assist you today?";
        } else if (inputLower.includes("help")) {
          return "I'm here to help! You can ask me questions, request information, or just chat. What would you like to know?";
        } else if (inputLower.includes("thank")) {
          return "You're welcome! Is there anything else I can help you with?";
        } else if (inputLower.includes("weather")) {
          return "I don't have access to real-time weather data, but I'd be happy to discuss weather patterns or climate in general!";
        } else if (inputLower.includes("name")) {
          return "I'm an AI assistant created to help answer your questions and provide information.";
        } else if (inputLower.includes("how are you")) {
          return "I'm functioning well, thank you for asking! How are you doing today?";
        } else if (inputLower.includes("bye") || inputLower.includes("goodbye")) {
          return "Goodbye! Feel free to return anytime you have questions. Have a great day!";
        } else {
          const responses = [
            "That's an interesting point. Could you tell me more about it?",
            "I understand. Let me know if you'd like more specific information on this topic.",
            "Thanks for sharing that. Is there a particular aspect you'd like to explore further?",
            "I see what you mean. Would you like me to provide more details on this subject?",
            "That's a great question. The answer involves several factors we could discuss.",
            "I appreciate your curiosity. This is an area with many fascinating aspects to explore.",
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        }
      };

    return (
        <ScrollArea className="flex-1 p-4 h-[calc(85vh-140px)]">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
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
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
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
    )

}