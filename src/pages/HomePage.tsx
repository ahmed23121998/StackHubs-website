import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Network,
  Shield,
  Wifi,
  Cloud,
  Cpu,
  Settings,
  Database,
  GraduationCap,
  Brain,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const hubs = [
    { icon: Brain, name: t("hubs.ai"), color: "#0EA5E9" },
    { icon: Network, name: t("hubs.network"), color: "#3B82F6" },
    { icon: Shield, name: t("hubs.infosec"), color: "#10B981" },
    { icon: Wifi, name: t("hubs.wifi"), color: "#8B5CF6" },
    { icon: Cloud, name: t("hubs.cloud"), color: "#06B6D4" },
    { icon: Cpu, name: t("hubs.iot"), color: "#F59E0B" },
    { icon: Settings, name: t("hubs.automation"), color: "#EF4444" },
    { icon: Database, name: t("hubs.sap"), color: "#84CC16" },
    { icon: GraduationCap, name: t("hubs.training"), color: "#F97316" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate("/services")}
              >
                {t("hero.cta")}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Hubs Icons Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {hubs.map((hub, index) => {
              const Icon = hub.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-4 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => navigate("/services")}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 text-white"
                    style={{ backgroundColor: hub.color }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">
                    {hub.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Service Hubs Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              {t("services.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              {t("services.subtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
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
      </section>
    </div>
  );
};

export default HomePage;
