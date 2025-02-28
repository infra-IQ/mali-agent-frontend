/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { RefreshCw, Send } from "lucide-react";
import { createNewConversationId, hanleChatCompletion } from "@/lib/http";
import { toast } from "sonner";
import { MessageChunk } from "@/lib/types";
import { useChatLoading } from "./states/chatLoading";
import { useConversation } from "./states/conversation";
import { streamAsyncIterable } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";

export const ChatInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { userId } = useAuth();
  const { isTyping, setIsTyping } = useChatLoading();
  const { addMessage, addChunkToMessage, conversation, updateConversationId } =
    useConversation();

  const onSendMessage = async () => {
    if (!inputValue) return;
    if (!userId) {
      toast("Please login to chat");
      return;
    }
    addMessage({ content: inputValue, role: "user" });
    setInputValue("");
    setIsTyping(true);
    let newConversationId = "";
    if (!conversation.id) {
      try {
        const data = await createNewConversationId({
          userId: userId,
        });
        updateConversationId(data.conversation.id);
        newConversationId = data.conversation.id;
      } catch (err) {
        setIsTyping(false);
        toast.error("Error while creating a new conversation:");
        console.error("Error while creating a new conversation:", err);
        return;
      }
    }

    const reader = await hanleChatCompletion({
      message: inputValue,
      userId: userId,
      conversationId: conversation.id || newConversationId,
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

          if (jsonData.signal) {
            // const resp = await paypack.cashin({
            //   amount: 100,
            //   number: "0789154432",
            //   environment: "development",
            // });
            // console.log({ resp });
            // createEscrow({
            //   productId: "randomProductId",
            //   seller: "0xdBc8997C1273bD8bc5af15f16df26C4FA03c0852",
            //   transactionDetails: JSON.stringify(jsonData.signal),
            // });
          }
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
      </form>
    </CardFooter>
  );
};
