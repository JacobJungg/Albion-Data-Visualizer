import { ChevronLeft} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { BotAvatar } from "@/components/chatbot/bot-avatar"; // Import the BotAvatar component

export const ChatHeader = () => {
  const router = useRouter();

  return (
    // Header top
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <BotAvatar/>


        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">Albion Assistant</p>
            <div className="flex items-center text-xs text-muted-foreground">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
