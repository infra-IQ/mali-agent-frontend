import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { RefreshCw, Send } from "lucide-react";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
  }

interface ChatInputProps {
    handleSendMessage: () => void;
}


export const ChatInput = ({handleSendMessage}: ChatInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    // const [messages, setMessages] = useState<Message[]>([
    //     {
    //       id: "1",
    //       content: "Hello! I'm your AI assistant. How can I help you today?",
    //       role: "assistant",
    //       timestamp: new Date(),
    //     },
    // ]);
    // const handleSendMessage = () => {
    //     if (!inputValue.trim()) return;
    
    //     const newMessage: Message = {
    //       id: Date.now().toString(),
    //       content: inputValue,
    //       role: "user",
    //       timestamp: new Date(),
    //     };
    
    //     setMessages((prev) => [...prev, newMessage]);
    //     setInputValue("");
    //     setIsTyping(true);
    
    //     // Simulate AI thinking and responding
    //     setTimeout(() => {
    //       const responseMessage: Message = {
    //         id: (Date.now() + 1).toString(),
    //         content: generateResponse(inputValue),
    //         role: "assistant",
    //         timestamp: new Date(),
    //       };
    
    //       setMessages((prev) => [...prev, responseMessage]);
    //       setIsTyping(false);
    //     }, 1500);
    // };

    // const generateResponse = (input: string) => {
    //     // Simple response generation based on input keywords
    //     const inputLower = input.toLowerCase();
    
    //     if (inputLower.includes("hello") || inputLower.includes("hi")) {
    //       return "Hello! It's nice to chat with you. How can I assist you today?";
    //     } else if (inputLower.includes("help")) {
    //       return "I'm here to help! You can ask me questions, request information, or just chat. What would you like to know?";
    //     } else if (inputLower.includes("thank")) {
    //       return "You're welcome! Is there anything else I can help you with?";
    //     } else if (inputLower.includes("weather")) {
    //       return "I don't have access to real-time weather data, but I'd be happy to discuss weather patterns or climate in general!";
    //     } else if (inputLower.includes("name")) {
    //       return "I'm an AI assistant created to help answer your questions and provide information.";
    //     } else if (inputLower.includes("how are you")) {
    //       return "I'm functioning well, thank you for asking! How are you doing today?";
    //     } else if (inputLower.includes("bye") || inputLower.includes("goodbye")) {
    //       return "Goodbye! Feel free to return anytime you have questions. Have a great day!";
    //     } else {
    //       const responses = [
    //         "That's an interesting point. Could you tell me more about it?",
    //         "I understand. Let me know if you'd like more specific information on this topic.",
    //         "Thanks for sharing that. Is there a particular aspect you'd like to explore further?",
    //         "I see what you mean. Would you like me to provide more details on this subject?",
    //         "That's a great question. The answer involves several factors we could discuss.",
    //         "I appreciate your curiosity. This is an area with many fascinating aspects to explore.",
    //       ];
    //       return responses[Math.floor(Math.random() * responses.length)];
    //     }
    //   };

      
    return (
        
            <CardFooter className="p-4 border-t bg-card">
            <form
              className="flex w-full items-center space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-background border-muted"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                {isTyping ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        
    )
        
    
};
