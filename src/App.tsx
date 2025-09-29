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
import { Toaster } from "@/components/ui/sonner";
import StorePage from "./pages/StorePage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";
import "./i18n/i18n";
import HubDetails from "./pages/HubDetails";
import { serviceHubs } from "@/data/serviceHubs";

function AppRoutes() {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const path = location.pathname;

    // لو صفحة hub details
    if (path.startsWith("/services/") && path.split("/").length === 3) {
      const hubId = path.split("/")[2]; // ai, network, infosec ...
      const hubs = serviceHubs(t);
      const hub = hubs.find((h) => h.id.endsWith(hubId));

      if (hub) {
        document.title = `${hub.title} - StackHubs`;
      } else {
        document.title = "Service Hub - StackHubs";
      }
    } else {
      // باقي الصفحات
      const titleByPath: Record<string, string> = {
        "/": "StackHubs - Your Partner in IT Innovation",
        "/services": "Services - StackHubs",
        "/contact": "Contact Us - StackHubs",
        "/loyal": "Loyal Program - StackHubs",
        "/partner": "Partner Program - StackHubs",
        "/login": "Login - StackHubs",
        "/register": "Register - StackHubs",
        "/favorites": "Favorites - StackHubs",
        "/store": "Store - StackHubs",
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
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/loyal" element={<LoyalProgramPage />} />
        <Route path="/partner" element={<PartnerProgramPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/services/:hubId" element={<HubDetails />} />
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
          toastOptions={{
            className: "text-xl px-6 py-6",
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
