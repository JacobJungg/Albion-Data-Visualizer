import { MessagesSquare    } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { ChatClient } from "@/components/chatbot/main-chat";


export const ChatDiv = () => {
    return (
        <div className="fixed bottom-4 right-4">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger><MessagesSquare/></MenubarTrigger>
            <MenubarContent>
              <div className="h-full p-4 space-y-2">
                <ChatClient />
              </div>
            </MenubarContent>
          </MenubarMenu>
        </Menubar> 
      </div> 
    );
  }

