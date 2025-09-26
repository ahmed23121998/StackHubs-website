import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/stack-hubs-logo.png";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "home", label: t("nav.home") },
    { key: "services", label: t("nav.services") },
    { key: "contact", label: t("nav.contact") },
    { key: "loyal", label: t("nav.loyal") },
    { key: "partner", label: t("nav.partner") },
    { key: "store", label: t("nav.store") },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleNavigation = (page: string) => {
    const pathMap: Record<string, string> = {
      home: "/",
      services: "/services",
      contact: "/contact",
      loyal: "/loyal",
      partner: "/partner",
      store: "/store",
    };
    navigate(pathMap[page] || "/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation("home")}
          >
            <img
              src={logo}
              alt="StackHubs Logo"
              className="h-10 w-auto"
              style={{ maxWidth: "160px" }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <div
                key={item.key}
                onClick={() => handleNavigation(item.key)}
                className={`text-sm font-medium transition-all duration-300 cursor-pointer
                  ${
                    (location.pathname === "/" && item.key === "home") ||
                    location.pathname === `/${item.key}`
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105"
                  }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {/* Theme & Language Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full px-4 py-2 whitespace-nowrap"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full px-4 py-2 whitespace-nowrap"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-9 h-9 p-0 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden py-4 border-t border-border"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400
                    ${
                      (location.pathname === "/" && item.key === "home") ||
                      location.pathname === `/${item.key}`
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-muted-foreground"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
