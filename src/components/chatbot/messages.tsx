"use client";

import { ElementRef, useEffect, useRef, useState } from "react";

import { ChatMessage, ChatMessageProps } from "@/components/chatbot/message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

  //one second of fake loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        role="system"
        content={`Ask me about an item, I'll reccomend a price!`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          content={message.content}
          role={message.role}
        />
      ))}
      {isLoading && (
        <ChatMessage
          role="system"
          isLoading
        />
      )}
      <div ref={scrollRef} />
    </div>
  );
};