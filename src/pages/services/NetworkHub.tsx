// src/pages/NetworkHubPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import networkHero from "@/assets/images/Network Hub 2.png";
import { useNavigate } from "react-router-dom";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const NetworkHubPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const data = t("networkHubPage", { returnObjects: true }) as any;
  const navigate = useNavigate();
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-all duration-700 ${
        isArabic ? "rtl text-right" : "ltr text-left"
      }`}
    >
      {/* 🌐 HERO SECTION */}
      <section className="relative flex items-center justify-center h-[85vh] text-center">
        <div className="absolute inset-0">
          <img
            src={networkHero}
            alt="Network Hub"
            className="w-full h-full object-cover brightness-[1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-brand/80"></div>

          {/* تغيير الخلفية بين النهار والليل */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-200/90 dark:from-gray-900/90 to-transparent transition-colors duration-500"></div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 sm:px-10 max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            {data.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed">
            {data.intro}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-primary to-brand text-white text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {data.cta}
          </Button>
        </motion.div>
      </section>

      {/* 💡 INTRO SECTION */}
      <section className="relative py-24 overflow-hidden transition-colors duration-700">
        {/* خلفية ناعمة بتتغير مع الوضع */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-all duration-700"></div>

        {/* تأثير ضوء خفيف */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_80%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-10 sm:p-14 text-center"
          >
            <div className="text-3xl md:text-4xl font-bold mb-6 pb-2 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent">
              {t("networkHubPage.introTitle")}
            </div>

            <div
              className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium tracking-wide ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {data.introParagraph}
            </div>

            {/* شريط زخرفي بسيط أسفل الكارد */}
            <div className="mt-10 mx-auto w-24 h-1.5 bg-gradient-to-r from-primary to-brand rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 WHAT WE DELIVER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/70 to-white dark:from-gray-800/50 dark:to-gray-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent"
          >
            {data.whatWeDeliverTitle}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
            {data.sections.map(
              (section: { title: string; desc: string }, idx: number) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.1}
                  className="relative group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-brand rounded-l-3xl opacity-70"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-brand group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.desc}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* 🌟 CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-r from-primary to-brand text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]"></div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto px-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            {data.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-100 leading-relaxed">
            {data.ctaSubtitle}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-primary to-brand text-white text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {data.ctaButton}
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default NetworkHubPage;
