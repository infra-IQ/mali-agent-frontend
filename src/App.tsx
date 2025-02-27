import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { ChatInput } from "./components/ChatInput";
import { MessagesArea } from "./components/ui/MessagesArea";

function App() {
  return (
    <div>
      <div className="flex h-screen w-1/2 mx-auto bg-background p-4 items-center justify-center mt-1">
        <Card className="w-full max-w-2xl h-[85vh] shadow-lg border-muted !py-0">
          <CardHeader className="px-6 py-4 border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Mali Agent</CardTitle>
              </div>
              <div className="flex gap-2">
                <DynamicWidget />
              </div>
            </div>
          </CardHeader>
          <MessagesArea />
          <ChatInput />
        </Card>
      </div>
    </div>
  );
}

export default App;
