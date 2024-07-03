import { BeatLoader } from "react-spinners";
import { Copy, BookOpenText } from "lucide-react"; // Import BookOpenText
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ChatMessageProps {
  role: "system" | "user",
  content?: string;
  isLoading?: boolean;
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
}: ChatMessageProps) => {
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
  }

  return (
    <div className={cn(
      "group flex items-start gap-x-3 py-4 w-full",
      role === "user" && "justify-end"
    )}>
      {role !== "user" && !isLoading && (
        <div className="w-8 h-8"> {/* Assuming BotAvatar uses a fixed size */}
          <BookOpenText className="w-8 h-8" /> {/* Render the BookOpenText icon */}
        </div>
      )}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading 
          ? <BeatLoader color={theme === "light" ? "black" : "white"} size={5} /> 
          : content
        }
      </div>
      {role === "user" && <BookOpenText/>}
      {role !== "user" && !isLoading && (
        <Button 
          onClick={onCopy} 
          className="opacity-0 group-hover:opacity-100 transition" 
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
