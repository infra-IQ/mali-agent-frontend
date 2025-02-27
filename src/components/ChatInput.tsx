/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { AudioLinesIcon, RefreshCw, Send } from "lucide-react";
import { hanleChatCompletion } from "@/lib/http";
import { toast } from "sonner";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MessageChunk } from "@/lib/types";
import { useChatLoading } from "./states/chatLoading";
import { useConversation } from "./states/conversation";
import { streamAsyncIterable } from "@/lib/utils";

export const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { user } = useDynamicContext();
  const { isTyping, setIsTyping } = useChatLoading();
  const { addMessage, addChunkToMessage } = useConversation();

  const onSendMessage = async () => {
    if (!inputValue) return;
    if (!user?.userId) {
      toast("Please login to chat");
      return;
    }
    addMessage({ content: inputValue, role: "user" });
    setInputValue("");
    setIsTyping(true);

    const reader = await hanleChatCompletion({
      message: inputValue,
      userId: user.userId,
    });

    if (!reader) return;
    setIsTyping(false);
    let text = "";
    addMessage({ content: "", role: "assistant" });
    const decoder = new TextDecoder();
    for await (const chunk of streamAsyncIterable(reader)) {
      const chunkValue = decoder.decode(new Uint8Array(chunk as any));
      if (chunkValue.trim() === "") continue;
      const lines = chunkValue
        .replace(/data:\s+/g, "")
        .trim()
        .split("\n");

      for (const line of lines) {
        if (line === "") continue;
        // Skip empty lines
        if (!line.replace(/\s+/g, "")) continue;

        try {
          const jsonData = JSON.parse(line) as MessageChunk;
          text += jsonData.choices[0].delta.content || "";
          addChunkToMessage({ chunk: text, role: "assistant" });
        } catch (err) {
          console.error("Error parsing JSON:", err, "in string:", line);
        }
      }
    }
  };

  return (
    <CardFooter className="p-4 border-t bg-card">
      <form
        className="flex w-full items-center space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
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
        <Button
          type="submit"
          size="icon"
          onClick={() => {
            console.log("Clickkkked");
            const speech = new SpeechSynthesisUtterance("My name is Jonathan");
            speech.lang = "en-US";
            speech.text = "My name is Jonathan";
            speech.onstart = (e) => {
              console.log({ e });
            };

            speech.onend = (e) => {
              console.log({ e });
            };

            console.log("Microphone access granted");
          }}
        >
          <AudioLinesIcon className="size-4" />
        </Button>
      </form>
    </CardFooter>
  );
};
