import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Sparkles,
  Code,
  Database,
  Zap,
  Globe,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "code" | "info";
  category?: string;
}

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = "" }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
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

  // Enhanced project knowledge base
  const projectKnowledge = {
    ar: {
      structure: {
        keywords: [
          "هيكل",
          "بنية",
          "مجلدات",
          "ملفات",
          "تنظيم",
          "structure",
          "folder",
        ],
        response: `🏗️ **هيكل المشروع:**
        
**المجلدات الرئيسية:**
• src/ - الكود المصدري
• components/ - المكونات القابلة لإعادة الاستخدام
• pages/ - صفحات التطبيق  
• contexts/ - إدارة الحالة العامة
• i18n/ - ملفات الترجمة
• utils/ - الوظائف المساعدة

**الملفات المهمة:**
• App.tsx - الملف الرئيسي للتطبيق
• main.tsx - نقطة دخول التطبيق
• index.css - الأنماط العامة`,
      },

      technologies: {
        keywords: [
          "تقنيات",
          "تكنولوجي",
          "tools",
          "tech",
          "libraries",
          "مكتبات",
        ],
        response: `⚡ **التقنيات المستخدمة:**
        
**الأساسية:**
• React 18 + TypeScript
• Vite (أداة البناء)
• Tailwind CSS (التصميم)

**المكتبات:**
• Framer Motion (الحركات والانتقالات)
• Lucide React (الأيقونات)
• React i18next (الترجمة)

**الميزات:**
• دعم كامل للغة العربية والإنجليزية
• تصميم متجاوب
• حركات سلسة ومتطورة`,
      },

      services: {
        keywords: [
          "خدمات",
          "خدمة",
          "services",
          "ماذا تقدمون",
          "what do you offer",
        ],
        response: `🚀 **خدمات StackHubs:**

**المراكز الأساسية:**
• 🌐 مركز الشبكات - بناء وإدارة الشبكات
• 🛡️ مركز أمن المعلومات - الحماية السيبرانية  
• 🔗 مركز إنترنت الأشياء - حلول IoT
• 🤖 مركز الأتمتة - أتمتة العمليات
• 💼 مركز SAP ERP - حلول الأعمال
• 🎓 مركز التدريب - التطوير المهني

**خدمات إضافية:**
• الاستشارات التقنية
• التطوير والبرمجة
• الصيانة والدعم`,
      },

      development: {
        keywords: [
          "تطوير",
          "برمجة",
          "development",
          "programming",
          "code",
          "كود",
        ],
        response: `💻 **معلومات التطوير:**

**بيئة التطوير:**
• Node.js + npm
• VS Code (محرر مُوصى به)
• Git للتحكم في الإصدار

**أوامر مهمة:**
• npm run dev - تشغيل الخادم المحلي
• npm run build - بناء المشروع
• npm run preview - معاينة البناء

**نصائح التطوير:**
• استخدم TypeScript للأمان
• اتبع معايير Tailwind CSS
• اختبر على شاشات مختلفة`,
      },

      features: {
        keywords: ["ميزات", "خصائص", "features", "وظائف", "functions"],
        response: `✨ **ميزات التطبيق:**

**الواجهة:**
• تصميم حديث وجذاب
• دعم الوضع المظلم والفاتح
• تجربة مستخدم متطورة

**التفاعل:**
• حركات سلسة
• استجابة فورية
• شات بوت ذكي

**التقنية:**
• أداء عالي مع Vite
• كود منظم ونظيف
• سهولة الصيانة والتطوير`,
      },
    },

    en: {
      structure: {
        keywords: [
          "structure",
          "folder",
          "files",
          "organization",
          "architecture",
        ],
        response: `🏗️ **Project Structure:**
        
**Main Directories:**
• src/ - Source code
• components/ - Reusable components
• pages/ - Application pages
• contexts/ - Global state management
• i18n/ - Translation files
• utils/ - Helper functions

**Important Files:**
• App.tsx - Main application file
• main.tsx - Application entry point
• index.css - Global styles`,
      },

      technologies: {
        keywords: ["technologies", "tech", "tools", "libraries", "stack"],
        response: `⚡ **Technologies Used:**
        
**Core:**
• React 18 + TypeScript
• Vite (Build tool)
• Tailwind CSS (Styling)

**Libraries:**
• Framer Motion (Animations)
• Lucide React (Icons)
• React i18next (Translation)

**Features:**
• Full Arabic & English support
• Responsive design
• Smooth animations`,
      },

      services: {
        keywords: ["services", "what do you offer", "business", "solutions"],
        response: `🚀 **StackHubs Services:**

**Core Hubs:**
• 🌐 Network Hub - Network infrastructure
• 🛡️ InfoSec Hub - Cybersecurity solutions
• 🔗 IoT Hub - Internet of Things
• 🤖 Automation Hub - Process automation
• 💼 SAP ERP Hub - Business solutions
• 🎓 Training Hub - Professional development

**Additional Services:**
• Technical consulting
• Development & programming
• Maintenance & support`,
      },

      development: {
        keywords: ["development", "programming", "coding", "dev", "build"],
        response: `💻 **Development Info:**

**Development Environment:**
• Node.js + npm
• VS Code (recommended)
• Git version control

**Important Commands:**
• npm run dev - Start dev server
• npm run build - Build project
• npm run preview - Preview build

**Development Tips:**
• Use TypeScript for safety
• Follow Tailwind CSS standards
• Test on different screens`,
      },

      features: {
        keywords: ["features", "capabilities", "functions", "what can it do"],
        response: `✨ **Application Features:**

**Interface:**
• Modern and attractive design
• Dark/Light mode support
• Advanced user experience

**Interaction:**
• Smooth animations
• Instant response
• Smart chatbot

**Technical:**
• High performance with Vite
• Clean, organized code
• Easy maintenance & development`,
      },
    },
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        text:
          i18n.language === "ar"
            ? "مرحباً! 🎉 أنا مساعد StackHubs الذكي. يمكنني مساعدتك في:\n\n• معلومات عن خدماتنا\n• تفاصيل تقنية عن المشروع\n• أسئلة حول التطوير\n• أي استفسار آخر!\n\nما الذي تود معرفته؟"
            : "Hello! 🎉 I'm StackHubs AI Assistant. I can help you with:\n\n• Information about our services\n• Technical details about the project\n• Development questions\n• Any other inquiries!\n\nWhat would you like to know?",
        sender: "bot",
        timestamp: new Date(),
        type: "info",
      };
      setMessages([welcomeMessage]);
    }
  }, [i18n.language]);

  const generateSmartResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    const currentLang = i18n.language as "ar" | "en";
    const knowledge = projectKnowledge[currentLang];

    // جملة تعريفية للرد
    const prefix =
      currentLang === "ar" ? "🟦 إجابة المساعد:\n" : "🟦 Assistant Answer:\n";

    // البحث في قاعدة المعرفة حسب الكلمات المفتاحية
    for (const [category, data] of Object.entries(knowledge)) {
      if (data.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        setCurrentCategory(category);
        return {
          id: `bot-${Date.now()}`,
          text: prefix + data.response,
          sender: "bot",
          timestamp: new Date(),
          type: "info",
          category: category,
        };
      }
    }

    // ردود سياقية حسب التصنيف الحالي
    if (currentCategory) {
      const contextualResponses = {
        ar: {
          structure: prefix + "هل تريد معرفة المزيد عن أي مجلد أو ملف محدد؟",
          technologies: prefix + "أي من هذه التقنيات تريد معرفة المزيد عنها؟",
          services: prefix + "أي خدمة تهمك أكثر وتريد تفاصيل إضافية عنها؟",
          development:
            prefix + "هل تحتاج مساعدة في إعداد البيئة أو تشغيل المشروع؟",
          features: prefix + "هل تريد معرفة كيفية استخدام أي من هذه الميزات؟",
        },
        en: {
          structure:
            prefix +
            "Would you like to know more about any specific folder or file?",
          technologies:
            prefix +
            "Which of these technologies would you like to learn more about?",
          services:
            prefix +
            "Which service interests you most and you'd like additional details?",
          development:
            prefix +
            "Do you need help setting up the environment or running the project?",
          features:
            prefix + "Would you like to know how to use any of these features?",
        },
      };

      const contextResponse =
        contextualResponses[currentLang][
          currentCategory as keyof (typeof contextualResponses)[typeof currentLang]
        ];
      if (contextResponse) {
        return {
          id: `bot-${Date.now()}`,
          text: contextResponse,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        };
      }
    }

    // رد افتراضي واضح إذا لم يجد إجابة
    return {
      id: `bot-${Date.now()}`,
      text:
        prefix +
        (currentLang === "ar"
          ? "لم أجد إجابة مباشرة، لكن يمكنك سؤالي عن أي جزء من المشروع أو الكود أو الخدمات وسأساعدك قدر الإمكان."
          : "I couldn't find a direct answer, but you can ask me about any part of the project, code, or services and I'll do my best to help."),
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const botResponse = generateSmartResponse(inputValue);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
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

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "structure":
        return <Code className="w-4 h-4" />;
      case "technologies":
        return <Zap className="w-4 h-4" />;
      case "services":
        return <Globe className="w-4 h-4" />;
      case "development":
        return <Database className="w-4 h-4" />;
      case "features":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4"
          >
            <Card
              className={`w-96 ${isMinimized ? "h-16" : "h-[500px]"} 
                shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 
                dark:from-gray-900 dark:to-gray-800 
                transition-all duration-300 ease-in-out overflow-hidden`}
            >
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-sm font-semibold">
                    {t("assistant")}
                  </CardTitle>
                  <Badge className="text-xs bg-green-500 border-green-400 text-white">
                    <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse" />
                    {t("online")}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMinimize}
                    className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {isMinimized ? (
                        <Maximize2 className="w-4 h-4" />
                      ) : (
                        <Minimize2 className="w-4 h-4" />
                      )}
                    </motion.div>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChatbot}
                    className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[436px]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[85%] ${
                              message.sender === "user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shadow-lg ${
                                message.sender === "user"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600"
                                  : "bg-gradient-to-r from-purple-500 to-purple-600"
                              }`}
                            >
                              {message.sender === "user" ? (
                                <User className="w-4 h-4" />
                              ) : (
                                getCategoryIcon(message.category)
                              )}
                            </motion.div>
                            <motion.div
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              className={`px-4 py-3 rounded-2xl text-sm shadow-lg ${
                                message.sender === "user"
                                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                                  : message.type === "info"
                                  ? "bg-gradient-to-r from-gray-50 to-white text-gray-800 border-l-4 border-purple-400 rounded-bl-md"
                                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                              }`}
                              style={{
                                direction:
                                  i18n.language === "ar" ? "rtl" : "ltr",
                                textAlign:
                                  i18n.language === "ar" ? "right" : "left",
                                whiteSpace: "pre-line",
                                lineHeight: "1.6",
                              }}
                            >
                              {message.text}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                <Bot className="w-4 h-4" />
                              </motion.div>
                            </div>
                            <div className="px-4 py-3 rounded-2xl bg-gray-100 border rounded-bl-md">
                              <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-purple-500 rounded-full"
                                    animate={{ y: [-2, 2, -2] }}
                                    transition={{
                                      duration: 0.6,
                                      repeat: Infinity,
                                      delay: i * 0.1,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex space-x-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t("type_message")}
                        className="flex-1 text-sm border-gray-200 rounded-full px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isTyping}
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                      />
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="px-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Button */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <Button
          onClick={toggleChatbot}
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-4 border-white relative overflow-hidden"
          size="sm"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0"
            animate={{ opacity: isOpen ? 0.3 : 0 }}
            transition={{ duration: 0.3 }}
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                {/* Notification dot */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default Chatbot;
