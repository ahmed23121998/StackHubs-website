import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, Globe, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import CustomTooltip from "../ui/CustomTooltip";
import logo from "../../assets/images/stack-hubs-logo.png";
import login from "../../assets/images/login.jpg";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: "home", label: t("nav.home") },
    { key: "about", label: t("nav.about") },
    { key: "services", label: t("nav.services") },
    { key: "loyal", label: t("nav.loyal") },
    { key: "partner", label: t("nav.partner") },
    { key: "projects", label: t("nav.projects") },
    // { key: "store", label: t("nav.store") },
    { key: "contact", label: t("nav.contact") },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleNavigation = (page: string) => {
    const pathMap: Record<string, string> = {
      home: "/",
      about: "/about",
      services: "/services",
      loyal: "/loyal",
      partner: "/partner",
      projects: "/projects",
      // store: "/store",
      contact: "/contact",
    };
    navigate(pathMap[page] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 w-full z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center  h-16 justify-between">
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
            {navItems.map((item) =>
              item.key === "contact" ? (
                <Button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className="px-5 py-2 bg-[#DF1783] text-white rounded-full hover:bg-pink-500 transition-all"
                >
                  {item.label}
                </Button>
              ) : (
                <div
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className={`text-sm font-medium transition-all duration-300 cursor-pointer text-brand
          ${
            (location.pathname === "/" && item.key === "home") ||
            location.pathname === `/${item.key}`
              ? "text-blue-600 dark:text-brand"
              : "text-muted-foreground hover:text-primary dark:hover:text-primary hover:scale-105"
          }`}
                >
                  {item.label}
                </div>
              )
            )}
          </div>

          {/* Theme & Language Controls */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 rtl:flex-row-reverse">
            {/* Auth Button */}
            {isAuthenticated ? (
              <CustomTooltip label={t("nav.settings")} side="bottom">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/settings")}
                  className="bg-primary text-white border-primary hover:bg-primary/70 
                  dark:text-white dark:border-primary dark:hover:bg-gray-800 
                  rounded-full w-9 h-9 p-0 flex items-center justify-center"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </CustomTooltip>
            ) : (
              <CustomTooltip label={t("auth.login")} side="bottom">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-white bg-primary border-primary hover:bg-primary/70 
                  dark:text-white dark:border-primary dark:hover:bg-gray-800 
                  rounded-full w-9 h-9 p-0 flex items-center justify-center"
                >
                  <img
                    src={login}
                    alt="Login"
                    className="h-5 w-5 rounded-full object-cover"
                  />
                </Button>
              </CustomTooltip>
            )}

            {/* Theme Toggle */}
            <CustomTooltip
              label={theme === "light" ? t("nav.lightMode") : t("nav.darkMode")}
              side="bottom"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="text-white bg-primary border-primary hover:bg-primary/70 
                dark:text-white dark:border-primary dark:hover:bg-gray-800 
                rounded-full w-9 h-9 p-0 flex items-center justify-center"
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </CustomTooltip>

            {/* Language Toggle */}
            <CustomTooltip label={t("nav.language")} side="bottom">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="text-white bg-primary border-primary hover:bg-primary/70 
                dark:text-white dark:border-primary dark:hover:bg-gray-800 
                rounded-full w-9 h-9 p-0 flex items-center justify-center"
              >
                <Globe className="h-4 w-4" />
              </Button>
            </CustomTooltip>

            {/* Mobile Menu Button */}
            <CustomTooltip label={t("nav.menu")} side="bottom">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden text-white bg-primary border-primary hover:bg-primary/70 
                dark:text-white dark:border-primary dark:hover:bg-gray-800 
                rounded-full w-9 h-9 p-0 flex items-center justify-center"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </CustomTooltip>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: i18n.language === "ar" ? 100 : -100,
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: i18n.language === "ar" ? 100 : -100,
            }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 ${
              i18n.language === "ar" ? "right-0" : "left-0"
            } w-64 max-w-[80%] h-full bg-gray-700 text-white border-primary dark:bg-gray-700 dark:text-white dark:border-primary  shadow-lg z-50 p-4 overflow-y-auto`}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            {/* Close button inside drawer */}
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white bg-primary hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {navItems.map((item) =>
                item.key === "contact" ? (
                  <Button
                    key={item.key}
                    onClick={() => handleNavigation(item.key)}
                    className="w-full px-4 py-2 bg-[#DF1783] text-white rounded-full hover:bg-pink-500 transition-all"
                  >
                    {item.label}
                  </Button>
                ) : (
                  <button
                    key={item.key}
                    onClick={() => handleNavigation(item.key)}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:text-primary dark:hover:text-primary text-brand
          ${
            (location.pathname === "/" && item.key === "home") ||
            location.pathname === `/${item.key}`
              ? "text-blue-600 dark:text-brand "
              : "text-muted-foreground hover:text-primary dark:hover:text-primary hover:scale-105"
          }`}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
