import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactForm from "@/components/ui/contact-form";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import contact from "@/assets/images/contact us.jpg";
// import background from "@/assets/images/background_contact.jpeg";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      key: "email",
      label: t("contact.form.email"),
      value: t("contact.info.email"),
      color: "#3B82F6",
      href: (v: string) => `mailto:${v}`,
    },
    {
      icon: Phone,
      key: "phone",
      label: t("contact.form.phone"),
      value: t("contact.info.phone"),
      color: "#10B981",
      href: (v: string) => `tel:${v}`,
    },
    {
      icon: MapPin,
      key: "address",
      label: t("contact.form.address"),
      value: t("contact.info.address"),
      color: "#F59E0B",
      href: (v: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          v
        )}`,
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/14HeWajLPGG/?mibextid=wwXIfr",
      label: "Facebook",
      hover: "hover:bg-blue-600",
    },
    {
      icon: Twitter,
      href: "https://x.com/Stackhubs_Globa",
      label: "Twitter",
      hover: "hover:bg-sky-500",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/stackhubs_global?igsh=MXE3MG16cTVtYTMyeA==&utm_source=ig_contact_invite",
      label: "Instagram",
      hover: "hover:bg-pink-600",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/stackhubs-global/?viewAsMember=true",
      label: "LinkedIn",
      hover: "hover:bg-blue-700",
    },
  ];

  return (
    <div
      className="min-h-screen py-16 dark:bg-gray-900/90 bg-cover bg-center bg-fixed relative"
      // style={{ backgroundImage: `url(${background})` }}
    >
      {/* خلفية شفافة فوق الصورة */}
      {/* <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div> */}

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-700 dark:text-gray-300"
          >
            {t("contact.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        {/* 🧩 الجزء الأول: الفورم والصورة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* الفورم شمال */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm />
          </motion.div>

          {/* الصورة يمين */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <img
                src={contact}
                alt="Contact Illustration"
                className="w-full rounded-2xl shadow-2xl object-cover border-2 border-white/20"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* 🧩 الجزء الثاني: السوشيال شمال - بيانات التواصل يمين */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* السوشيال شمال */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {t("contact.followUs")}
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
                    className={`w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${social.hover}`}
                  >
                    <social.icon className="w-6 h-6 text-gray-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* بيانات التواصل يمين */}
          <div className="flex flex-col gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href(info.value)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="
          flex items-center gap-3 p-4 rounded-xl
          text-gray-900 dark:text-white
          bg-white/70 dark:bg-white/10
          backdrop-blur-md
          hover:bg-white/90 dark:hover:bg-white/20
          transition-all duration-300
          border border-gray-300/50 dark:border-white/20
          shadow-sm hover:shadow-md
        "
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: info.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {info.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
