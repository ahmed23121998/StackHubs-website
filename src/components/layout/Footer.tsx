import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../../assets/stack-hubs-logo.png";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const companyLinks = [
    { label: t("footer.home"), href: "/" },
    { label: t("footer.services"), href: "/services" },
    { label: t("footer.contact"), href: "/contact" },
    { label: t("footer.loyal"), href: "/loyal" },
    { label: t("footer.partner"), href: "/partner" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/",
      label: "Facebook",
      hover: "hover:bg-blue-600",
    },
    {
      icon: Twitter,
      href: "https://x.com/",
      label: "Twitter",
      hover: "hover:bg-sky-500",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/",
      label: "Instagram",
      hover: "hover:bg-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
      hover: "hover:bg-blue-700",
    },
  ];

  return (
    <footer className="bg-blue-50 border-t border-border dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 mb-4 cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              <img
                src={logo}
                alt="StackHubs Logo"
                className="h-10 w-auto"
                style={{ maxWidth: "160px" }}
              />
            </motion.div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.company")}
            </h3>
            <div className="space-y-2">
              {companyLinks.map((link, index) => (
                <motion.span
                  onClick={() => handleNavigate(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="block text-sm text-muted-foreground cursor-pointer
                  transition-all duration-300
                  hover:text-blue-600 hover:translate-x-1 hover:font-semibold"
                >
                  {link.label}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">
              {t("contact.title")}
            </h3>
            <div className="space-y-4">
              {/* email */}
              <a
                href="mailto:info@stackhubs.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-blue-600"
              >
                <Mail className="w-5 h-5 text-blue-500" />
                <span>{t("contact.info.email")}</span>
              </a>
              {/* Phone */}
              <a
                href="tel:+201149958181"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-green-600"
              >
                <Phone className="w-5 h-5 text-green-500" />
                <span>{t("contact.info.phone")}</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">
              {t("footer.followUs")}
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div
                    className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${social.hover}`}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
