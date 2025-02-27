import { BACKEND_URL } from "./constants";
import { toast } from "sonner";

export enum ENDPOINT {
  chat = "/chat",
}

export async function hanleChatCompletion({
  message,
  userId,
}: {
  message: string;
  userId: string;
}) {
  try {
    const response = await fetch(`${BACKEND_URL}${ENDPOINT.chat}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message, userId }),
    });

    const reader = response.body as ReadableStream<unknown>;
    return reader;
  } catch (error) {
    toast("Error while handling chat completion:");
    console.error("Error while handling chat completion:", error);
    throw error;
  }
}
