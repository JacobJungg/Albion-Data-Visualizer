"use client";
import { FormEvent, useState } from "react";
import { ChatForm } from "@/components/chatbot/form";
import { ChatHeader } from "@/components/chatbot/header";
import { ChatMessages } from "@/components/chatbot/messages";
import { ChatMessageProps } from "@/components/chatbot/message";

export const ChatClient = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };
    const systemMessage: ChatMessageProps = {
      role: "system",
      content: "Error, please try again",
    };

    setIsLoading(true); 

    setMessages((current) => [...current, userMessage]);



    setTimeout(() => {
      setMessages((current) => [...current, systemMessage]);
      setIsLoading(false); // Set loading state to false after animation
    }, 3000); 
    
    setInput("");
  };

  return (
    <div className="flex flex-col h-full space-y-2">
      <ChatHeader />
      <ChatMessages isLoading={isLoading} messages={messages} />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
