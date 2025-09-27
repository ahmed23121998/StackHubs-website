import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "normal" | "code";
  category?: string;
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [projectDocs, setProjectDocs] = useState<{ [key: string]: string }>({});

  // ✅ تحميل project.json بعد النشر
  useEffect(() => {
    const loadDocs = async () => {
      try {
        const res = await fetch("/project.json");
        if (!res.ok) throw new Error("Failed to load docs");
        const data = await res.json();
        setProjectDocs(data);
        console.log("📂 Loaded project docs:", Object.keys(data));
      } catch (err) {
        console.error("Error loading project docs:", err);
      }
    };
    loadDocs();
  }, []);

  // ✅ توليد رد ذكي
  const generateSmartResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase();

    // 🔍 البحث داخل project.json
    for (const [fileName, content] of Object.entries(projectDocs)) {
      if (content.toLowerCase().includes(lowerMessage)) {
        return {
          id: `bot-${Date.now()}`,
          text: `📂 وجدت كود متعلق بسؤالك في الملف **${fileName}**:\n\n\`\`\`\n${content.slice(
            0,
            400
          )}...\n\`\`\``,
          sender: "bot",
          timestamp: new Date(),
          type: "code",
          category: "structure",
        };
      }
    }

    // ✨ fallback للردود الجاهزة
    if (lowerMessage.includes("هلو") || lowerMessage.includes("hi")) {
      return {
        id: `bot-${Date.now()}`,
        text: "أهلاً 👋، كيف أقدر أساعدك في الكود بتاعك؟",
        sender: "bot",
        timestamp: new Date(),
      };
    }

    return {
      id: `bot-${Date.now()}`,
      text: "🤖 مش لاقيت حاجة في الكود عن سؤالك. جرب توضح أكتر.",
      sender: "bot",
      timestamp: new Date(),
    };
  };

  // ✅ إرسال رسالة
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = generateSmartResponse(input);
      setMessages((prev) => [...prev, botResponse]);
    }, 500);

    setInput("");
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 shadow-lg rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-2 mb-4">
        <Bot className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">AI Chatbot</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-2xl shadow ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {msg.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <pre className="whitespace-pre-wrap text-sm">{msg.text}</pre>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="اكتب سؤالك هنا..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;
