import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, Globe, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/stack-hubs-logo.png";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 w-full z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer min-w-0"
            onClick={() => handleNavigation("/")}
          >
            <img
              src={logo}
              alt="StackHubs Logo"
              className="h-8 w-auto sm:h-10 max-w-[120px] sm:max-w-[160px]"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
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
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 rtl:flex-row-reverse">
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/settings")}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full w-9 h-9 p-0"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full"
                >
                  {t("auth.login")}
                </Button>
              </div>
            )}

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full w-9 h-9 p-0"
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
              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full w-9 h-9 p-0"
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
            initial={{
              opacity: 0,
              x: i18n.language === "ar" ? "-100%" : "100%",
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: i18n.language === "ar" ? "-100%" : "100%" }}
            className={`fixed top-0 ${
              i18n.language === "ar" ? "left-0" : "right-0"
            } w-64 h-full bg-white dark:bg-gray-900 shadow-lg z-50 p-4 overflow-y-auto`}
          >
            {/* Close button inside drawer */}
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
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

              {/* Mobile Theme & Language Controls */}
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex gap-2 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800"
                  >
                    {theme === "light" ? (
                      <Moon className="h-4 w-4 mr-2" />
                    ) : (
                      <Sun className="h-4 w-4 mr-2" />
                    )}
                    {theme === "light"
                      ? t("navbar.theme.dark")
                      : t("navbar.theme.light")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex-1 text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {i18n.language === "en"
                      ? t("navbar.language.arabic")
                      : t("navbar.language.english")}
                  </Button>
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-border pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      {t("auth.welcome")}, {user?.name}
                    </div>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {t("settings.title")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {t("auth.login")}
                    </button>
                    {/* <button
                      onClick={() => {
                        navigate("/register");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {t("auth.register")}
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
