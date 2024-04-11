//@ts-nocheck
"use client";
import React, { useState } from "react";
import OpenAI from "openai";

interface Message {
  role: string;
  content: string;
}
import ChatCompletion from "openai";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const openai = new OpenAI({
    apiKey: "pk-LIzxiUtdPdRsAikJtDLVrXyIHLmBEWbAEoqutthxYXTfRsue",
    baseURL: "https://api.pawan.krd/v1",
    dangerouslyAllowBrowser: true,
  });

  const fetchChatCompletion = async (userMessage: string) => {
    try {
      // Add the user's question to the conversation
      const newMessages: Message[] = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      setMessages(newMessages);

      // Fetch the AI response
      const chatCompletion: ChatCompletion =
        await openai.chat.completions.create({
          messages: newMessages,
          model: "pai-001",
        });
      let responseContent = chatCompletion.choices[0].message.content;
      
      // Limit the length of the AI response to a maximum of 1500 characters
      if (responseContent.length > 1500) {
        responseContent = responseContent.slice(0, 1500) + "...";
      }

      const aiResponse: Message = { role: "ai", content: responseContent };
      setMessages([...newMessages, aiResponse]); // Add AI response to the conversation
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return; // Don't send empty messages
    fetchChatCompletion(input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg py-2 px-3 max-w-xs ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center p-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow outline-none rounded-full py-2 px-4 mr-2 bg-gray-200"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
