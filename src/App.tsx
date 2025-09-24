import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import LoyalProgramPage from "@/pages/LoyalProgramPage";
import PartnerProgramPage from "@/pages/PartnerProgramPage";
import { Toaster } from "@/components/ui/sonner";
import Chatbot from "@/components/ui/chatbot";
import "./i18n/i18n";

function AppRoutes() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const titleByPath: Record<string, string> = {
      "/": "StackHubs - Your Partner in IT Innovation",
      "/services": "Services - StackHubs",
      "/contact": "Contact Us - StackHubs",
      "/loyal": "Loyal Program - StackHubs",
      "/partner": "Partner Program - StackHubs",
    };
    document.title = titleByPath[path] || "StackHubs";

    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [location.pathname, i18n.language]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/loyal" element={<LoyalProgramPage />} />
        <Route path="/partner" element={<PartnerProgramPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <AppRoutes />
        <Chatbot />
        <Toaster
          position="top-center"
          toastOptions={{
            className: "text-2xl px-6 py-6"
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
