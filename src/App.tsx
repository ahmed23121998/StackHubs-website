import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import LoyalProgramPage from "@/pages/LoyalProgramPage";
import PartnerProgramPage from "@/pages/PartnerProgramPage";
import AboutPage from "@/pages/AboutPage";
import { Toaster } from "@/components/ui/sonner";
// import StorePage from "./pages/StorePage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import "./i18n/i18n";
import HubDetails from "./pages/HubDetails";
// import { serviceHubs } from "@/data/serviceHubs";
import AIHub from "@/pages/services/AIHub";
import NetworkHub from "@/pages/services/NetworkHub";
import InfoSecHub from "@/pages/services/InfoSecHub";
import IoTHub from "@/pages/services/IoTHub";
import AutomationHub from "@/pages/services/AutomationHub";
import ERPHub from "@/pages/services/ERPHub";
import TrainingHub from "@/pages/services/TrainingHub";
import WirelessHub from "@/pages/services/WirelessHub";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

function AppRoutes() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/services/ai") document.title = "AI Hub - StackHubs";
    else if (path === "/services/network")
      document.title = "Network Hub - StackHubs";
    else if (path === "/services/infosec")
      document.title = "InfoSec Hub - StackHubs";
    else if (path === "/services/iot") document.title = "IoT Hub - StackHubs";
    else if (path === "/services/automation")
      document.title = "Automation Hub - StackHubs";
    else if (path === "/services/erp") document.title = "ERP Hub - StackHubs";
    else if (path === "/services/training")
      document.title = "Training Hub - StackHubs";
    else if (path === "/services/wireless")
      document.title = "Wireless Hub - StackHubs";
    else {
      // باقي الصفحات
      const titleByPath: Record<string, string> = {
        "/": "Home - StackHubs",
        "/services": "Services - StackHubs",
        "/contact": "Contact Us - StackHubs",
        "/loyal": "Loyal Program - StackHubs",
        "/partner": "Partner Program - StackHubs",
        "/about": "About Us - StackHubs",
        "/login": "Login - StackHubs",
        "/register": "Register - StackHubs",
        "/favorites": "Favorites - StackHubs",
        // "/store": "Store - StackHubs",
        "/checkout": "Checkout - StackHubs",
        "/orders": "Orders - StackHubs",
        "/settings": "Settings - StackHubs",
      };
      document.title = titleByPath[path] || "StackHubs";
    }

    // تحديث اللغة والاتجاه
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [location.pathname, i18n.language, t]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ai" element={<AIHub />} />
        <Route path="/services/network" element={<NetworkHub />} />
        <Route path="/services/infosec" element={<InfoSecHub />} />
        <Route path="/services/iot" element={<IoTHub />} />
        <Route path="/services/automation" element={<AutomationHub />} />
        <Route path="/services/erp" element={<ERPHub />} />
        <Route path="/services/training" element={<TrainingHub />} />
        <Route path="/services/wireless" element={<WirelessHub />} />
        <Route path="/services/:hubId" element={<HubDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/loyal" element={<LoyalProgramPage />} />
        <Route path="/partner" element={<PartnerProgramPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/store" element={<StorePage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route
          path="/settings"
          element={isAuthenticated ? <SettingsPage /> : <LoginPage />}
        />
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
        <Toaster
          position="top-right"
          expand={true}
          // closeButton
          toastOptions={{
            className:
              "text-black sm:text-lg rounded-2xl shadow-lg border dark:border-gray-700 bg-brand dark:bg-gray-900 text-gray-800 dark:text-gray-100",
            duration: 3000,
            style: {
              fontFamily: "inherit",
              direction: "rtl",
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
