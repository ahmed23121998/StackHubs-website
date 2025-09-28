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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import hero from "../assets/hero.jpg";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

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

  const slides = [
    {
      image: hero,
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      cta: t("hero.cta"),
      link: "/services",
    },
    {
      image: hero1,
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      cta: t("hero.cta"),
      link: "/services",
    },
    {
      image: hero2,
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      cta: t("hero.cta"),
      link: "/services",
    },
    {
      image: hero3,
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      cta: t("hero.cta"),
      link: "/services",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section - Slider */}
      <section>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="h-full hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                {/* صورة الخلفية */}
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />

                {/* الـ Overlay الخاص بالـ Slide */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center px-6 sm:px-10 md:px-16">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                  >
                    {t(slide.title)}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                    {t(slide.subtitle)}
                  </motion.p>

                  {slide.cta && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 m-8"
                        onClick={() => navigate(slide.link)}
                      >
                        {t(slide.cta)}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Service Hubs Icons Grid */}
      <section className="py-2 dark:bg-gray-900 dark:text-gray-100">
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
                    {t(hub.name)}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Service Hubs Section */}
      <section className="py-10 bg-muted/50">
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
