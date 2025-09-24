import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = "" }) => {
  const {i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [projectIndex, setProjectIndex] = useState<
    Array<{ path: string; content: string }>
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        text:
          i18n.language === "ar"
            ? "مرحباً! أنا مساعد StackHubs الذكي. كيف يمكنني مساعدتك اليوم؟"
            : "Hello! I'm StackHubs AI Assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [i18n.language]);

  // Build a lightweight in-browser index of project files (text only)
  useEffect(() => {
    const loadFiles = async () => {
      try {
        const modules = import.meta.glob("/src/**/*.{ts,tsx,css,md,json}", {
          as: "raw",
        });
        const entries = Object.entries(modules);
        const loaded: Array<{ path: string; content: string }> = [];
        // Limit to avoid huge payloads
        const MAX_BYTES = 20000;
        for (const [path, loader] of entries) {
          // Skip big generated files or node_modules defensively
          if (path.includes("node_modules") || path.endsWith(".d.ts")) continue;
          const content: string = await (loader as () => Promise<string>)();
          loaded.push({ path, content: content.slice(0, MAX_BYTES) });
        }
        setProjectIndex(loaded);
      } catch (e) {
        // fail silently; chatbot will fallback to canned answers
      }
    };
    loadFiles();
  }, []);

  const projectQnA = (question: string): string | null => {
    const q = question.toLowerCase();
    // Simple in-memory FAQ about project structure and features
    if (q.includes("router") || q.includes("route") || q.includes("navigate")) {
      return i18n.language === "ar"
        ? "التنقل شغال بـ react-router-dom: الملف main.tsx ملفوف داخل BrowserRouter، والراوتس متعرفة في App.tsx داخل Layout."
        : "Routing uses react-router-dom: main.tsx wraps with BrowserRouter, and routes are defined in App.tsx inside Layout.";
    }
    if (q.includes("theme") || q.includes("dark") || q.includes("light")) {
      return i18n.language === "ar"
        ? "نظام الثيم موجود في contexts/ThemeContext.tsx، والنافبار يبدّل الثيم باستخدام useTheme()."
        : "Theme system lives in contexts/ThemeContext.tsx, Navbar toggles theme via useTheme().";
    }
    if (
      q.includes("language") ||
      q.includes("i18n") ||
      q.includes("translate")
    ) {
      return i18n.language === "ar"
        ? "الترجمة باستخدام i18next في src/i18n/i18n.ts مع ملفات locales en.json و ar.json."
        : "Translations use i18next in src/i18n/i18n.ts with locales en.json and ar.json.";
    }
    if (q.includes("chatbot") || q.includes("bot")) {
      return i18n.language === "ar"
        ? "مكون الشات بوت في components/ui/chatbot.tsx، فيه رسائل، كتابة، وحالة تصغير. نقدر نطوره كمان."
        : "Chatbot component is at components/ui/chatbot.tsx with messages, typing, and minimize state. We can extend it.";
    }
    if (q.includes("services") || q.includes("ai")) {
      return i18n.language === "ar"
        ? "صفحة الخدمات في pages/ServicesPage.tsx، وتم إضافة AI Hub بأيقونة Brain وخدمات RAG/Chatbots."
        : "Services are in pages/ServicesPage.tsx; AI Hub added with Brain icon and RAG/Chatbots.";
    }
    return null;
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple project Q&A: try to find matching files and return short snippets
    if (projectIndex.length > 0) {
      const terms = lowerMessage.split(/\s+/).filter(Boolean);
      const scored = projectIndex
        .map(({ path, content }) => {
          const score = terms.reduce(
            (acc, term) => acc + (content.toLowerCase().includes(term) ? 1 : 0),
            0
          );
          return { path, content, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      if (scored.length > 0) {
        const snippets = scored.map((r) => {
          // Take first matching line as a snippet
          const idx = r.content
            .toLowerCase()
            .indexOf(
              terms.find((t) => r.content.toLowerCase().includes(t)) || ""
            );
          const start = Math.max(0, idx - 120);
          const end = Math.min(r.content.length, idx + 240);
          const preview = r.content
            .slice(start, end)
            .replace(/\s+/g, " ")
            .trim();
          return `- ${r.path}: ${preview}`;
        });
        if (i18n.language === "ar") {
          return `وجدت معلومات ذات صلة في هذه الملفات:\n${snippets.join(
            "\n"
          )}\n\nهل ترغب أن أفتح لك الملف المناسب؟`;
        } else {
          return `I found relevant info in these files:\n${snippets.join(
            "\n"
          )}\n\nWould you like me to point you to a specific file?`;
        }
      }
    }
    const projectAnswer = projectQnA(lowerMessage);
    if (projectAnswer) return projectAnswer;

    if (i18n.language === "ar") {
      if (lowerMessage.includes("خدمات") || lowerMessage.includes("خدمة")) {
        return "نحن نقدم خدمات تقنية شاملة تشمل: مركز الشبكات، مركز أمن المعلومات، مركز إنترنت الأشياء، مركز الأتمتة، مركز SAP ERP، ومركز التدريب. أي خدمة تهمك أكثر؟";
      }
      if (lowerMessage.includes("شبكات") || lowerMessage.includes("network")) {
        return "مركز الشبكات لدينا يقدم: الاستشارة، الخدمة المُدارة، التنفيذ، المراجعة، والتحديث. نحن نبني بنية شبكات قوية لعملك.";
      }
      if (
        lowerMessage.includes("أمن") ||
        lowerMessage.includes("أمان") ||
        lowerMessage.includes("security")
      ) {
        return "مركز أمن المعلومات يوفر حلول أمن سيبراني شاملة تشمل: اختبار الثغرات، الاستجابة للحوادث، الامتثال، ومراقبة الأمان على مدار الساعة.";
      }
      if (
        lowerMessage.includes("تواصل") ||
        lowerMessage.includes("اتصال") ||
        lowerMessage.includes("contact")
      ) {
        return "يمكنك التواصل معنا عبر: البريد الإلكتروني info@stackhubs.com أو الهاتف +1 (555) 123-4567. نحن هنا لمساعدتك!";
      }
      if (
        lowerMessage.includes("سعر") ||
        lowerMessage.includes("تكلفة") ||
        lowerMessage.includes("price")
      ) {
        return "أسعارنا تختلف حسب نوع الخدمة ومتطلبات مشروعك. يرجى التواصل معنا للحصول على عرض سعر مخصص يناسب احتياجاتك.";
      }
      return "شكراً لسؤالك! يمكنني مساعدتك في معرفة المزيد عن خدماتنا التقنية. هل تريد معرفة المزيد عن خدمة معينة؟";
    } else {
      if (
        lowerMessage.includes("service") ||
        lowerMessage.includes("what do you do")
      ) {
        return "We offer comprehensive IT services including: Network Hub, InfoSec Hub, IoT Hub, Automation Hub, SAP ERP Hub, and Training Hub. Which service interests you most?";
      }
      if (
        lowerMessage.includes("network") ||
        lowerMessage.includes("networking")
      ) {
        return "Our Network Hub provides: Consultation, Managed Service, Implementation, Auditing, and Modernization. We build robust network infrastructure for your business.";
      }
      if (
        lowerMessage.includes("security") ||
        lowerMessage.includes("cybersecurity")
      ) {
        return "Our InfoSec Hub offers comprehensive cybersecurity solutions including: Vulnerability Testing, Incident Response, Compliance, and 24/7 Security Monitoring.";
      }
      if (
        lowerMessage.includes("contact") ||
        lowerMessage.includes("reach") ||
        lowerMessage.includes("get in touch")
      ) {
        return "You can reach us at: Email info@stackhubs.com or Phone +1 (555) 123-4567. We're here to help!";
      }
      if (
        lowerMessage.includes("price") ||
        lowerMessage.includes("cost") ||
        lowerMessage.includes("pricing")
      ) {
        return "Our pricing varies based on the service type and your project requirements. Please contact us for a customized quote that fits your needs.";
      }
      if (
        lowerMessage.includes("iot") ||
        lowerMessage.includes("internet of things")
      ) {
        return "Our IoT Hub provides smart IoT solutions including Device Management, Edge Computing, IoT Security, and Predictive Maintenance for connected business operations.";
      }
      if (lowerMessage.includes("sap") || lowerMessage.includes("erp")) {
        return "Our SAP ERP Hub offers complete SAP solutions: Implementation, Consultation, Support, Data Migration, Security, and Optimization services.";
      }
      return "Thank you for your question! I can help you learn more about our IT services. Would you like to know more about a specific service?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card
              className={`w-80 h-96 shadow-2xl ${
                isMinimized ? "h-14" : "h-96"
              } transition-all duration-300`}
            >
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-sm font-medium">
                    {i18n.language === "ar"
                      ? "مساعد StackHubs"
                      : "StackHubs Assistant"}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-500 text-white"
                  >
                    {i18n.language === "ar" ? "متصل" : "Online"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMinimize}
                    className="w-6 h-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-3 h-3" />
                    ) : (
                      <Minimize2 className="w-3 h-3" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChatbot}
                    className="w-6 h-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-80">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[80%] ${
                              message.sender === "user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                                message.sender === "user"
                                  ? "bg-primary"
                                  : "bg-muted-foreground"
                              }`}
                            >
                              {message.sender === "user" ? (
                                <User className="w-3 h-3" />
                              ) : (
                                <Bot className="w-3 h-3" />
                              )}
                            </div>
                            <div
                              className={`px-3 py-2 rounded-lg text-sm ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {message.text}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 rounded-full bg-muted-foreground flex items-center justify-center text-white text-xs">
                              <Bot className="w-3 h-3" />
                            </div>
                            <div className="px-3 py-2 rounded-lg bg-muted text-muted-foreground text-sm">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-current rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-current rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={
                          i18n.language === "ar"
                            ? "اكتب رسالتك..."
                            : "Type your message..."
                        }
                        className="flex-1 text-sm"
                        disabled={isTyping}
                      />
                      <Button
                        size="sm"
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="px-3"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={toggleChatbot}
          className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default Chatbot;
