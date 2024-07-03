import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BookOpenText } from "lucide-react";

interface BotAvatarProps {
  // No src prop in this version
}

export const BotAvatar = () => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage>
        <BookOpenText />
      </AvatarImage>
    </Avatar>
  );
}