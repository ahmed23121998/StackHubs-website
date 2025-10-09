import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/service-card";
import { serviceHubs } from "@/data/serviceHubs";

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  // استدعي الـ hubs مع الترجمة
  const hubs = serviceHubs(t);

  return (
    <div className="min-h-screen py-12 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {t("services.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hubs.map((hub, index) => (
            <ServiceCard
              id={hub.id}
              key={hub.id}
              icon={hub.icon}
              title={hub.title}
              subtitle={hub.subtitle}
              services={hub.services}
              color={hub.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
