import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { serviceHubs } from "@/data/serviceHubs";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hubs = useMemo(() => serviceHubs(t), [i18n.language, t]);

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section - Slider */}
      <section>
        <Swiper
          key={i18n.language}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full hero-swiper"
        >
          {hubs.map((hub, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                {/* صورة الخلفية */}
                <img
                  src={hub.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-center px-6 sm:px-10 md:px-16">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                  >
                    {hub.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
                  >
                    {hub.subtitle}
                  </motion.p>

                  {/* CTA Button - يفتح صفحة تفاصيل الـ hub */}
                  {t("hero.cta") && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 m-8"
                        onClick={() => navigate(`/services/${hub.id}`)}
                      >
                        {t("hero.cta")}
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
      <section className="pt-2 pb-12 dark:bg-gray-900 dark:text-gray-100">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 px-2">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
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
                  className={`flex flex-col items-center text-center p-4 rounded-lg cursor-pointer transition-all duration-300 
                    ${
                      activeIndex === index
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : "hover:shadow-md"
                    }`}
                  onClick={() => {
                    setActiveIndex(index);
                    swiperRef.current?.slideToLoop(index);
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3 text-white"
                    style={{ backgroundColor: hub.color }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium text-foreground text-center">
                    {hub.title}
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
