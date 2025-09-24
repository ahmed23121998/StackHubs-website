import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactForm from "@/components/ui/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      key: "email",
      label: t("contact.form.email"),
      value: t("contact.info.email"),
      color: "#3B82F6",
    },
    {
      icon: Phone,
      key: "phone",
      label: t("contact.form.phone"),
      value: t("contact.info.phone"),
      color: "#10B981",
    },
    {
      icon: MapPin,
      key: "address",
      label: t("contact.form.address"),
      value: t("contact.info.address"),
      color: "#F59E0B",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {t("contact.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                // تحديد اللينك المناسب
                let href = "#";
                if (info.key === "email") href = `mailto:${info.value}`;
                if (info.key === "phone") href = `tel:${info.value}`;
                if (info.key === "address")
                  href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    info.value
                  )}`;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card
                        className="cursor-pointer hover:shadow-lg hover:bg-muted/50 transition-all"
                        onClick={() => {
                          if (info.key === "Email") {
                            window.location.href = `mailto:${info.value}`;
                          }
                          if (info.key === "Phone") {
                            window.location.href = `tel:${info.value}`;
                          }
                          if (info.key === "Address") {
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                info.value
                              )}`,
                              "_blank"
                            );
                          }
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                              style={{ backgroundColor: info.color }}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground mb-1">
                                {info.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {info.value}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
