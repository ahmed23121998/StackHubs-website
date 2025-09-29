import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { serviceHubs } from "../data/serviceHubs";
import { useTranslation } from "react-i18next";

const HubDetails: React.FC = () => {
  const { hubId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // استدعي hubs مع الترجمة
  const hubs = serviceHubs(t);
  const hub = hubs.find((h) => h.id === hubId);

  if (!hub) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("hubDetails.notFound")}</h1>
        <Button onClick={() => navigate("/services")}>
          ⬅️ {t("hubDetails.backToServices")}
        </Button>
      </div>
    );
  }

  const Icon = hub.icon;

  return (
    <div className="min-h-screen py-12 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-center gap-6"
        >
          {/* الأيقونة */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg flex-shrink-0"
            style={{ backgroundColor: hub.color }}
          >
            <Icon className="w-10 h-10" />
          </div>

          {/* النصوص */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{hub.title}</h1>
            <p className="text-lg text-muted-foreground">{hub.subtitle}</p>
          </div>
        </motion.div>

        {/* Services list */}
        <div className="grid gap-6">
          {hub.services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 border rounded-2xl shadow-md dark:border-gray-700 bg-card"
            >
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button
            size="lg"
            onClick={() => navigate("/services")}
            className="px-8 py-4"
          >
            {t("hero.cta")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HubDetails;
