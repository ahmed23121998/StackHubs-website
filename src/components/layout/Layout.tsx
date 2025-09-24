import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        i18n.language === "ar" ? "rtl" : "ltr"
      }`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
