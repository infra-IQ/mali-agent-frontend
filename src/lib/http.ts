import { BACKEND_URL } from "./constants";
import { toast } from "sonner";

export enum ENDPOINT {
  chat = "/chat",
  conversationId = "/conversations",
}

export async function hanleChatCompletion({
  message,
  userId,
  conversationId,
}: {
  message: string;
  userId: string;
  conversationId: string;
}) {
  try {
    const response = await fetch(`${BACKEND_URL}${ENDPOINT.chat}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message, userId, conversationId }),
    });

    const reader = response.body as ReadableStream<unknown>;
    return reader;
  } catch (error) {
    toast("Error while handling chat completion:");
    console.error("Error while handling chat completion:", error);
    throw error;
  }
}

export async function createNewConversationId({ userId }: { userId: string }) {
  try {
    const response = await fetch(`${BACKEND_URL}${ENDPOINT.conversationId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create conversation ID: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    toast("Error while creating a new conversation ID:");
    console.error("Error while creating a new conversation ID:", error);
    throw error;
  }
}
