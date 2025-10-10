// src/pages/NetworkHubPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import networkHero from "@/assets/images/Network Hub 2.png";
import { useNavigate } from "react-router-dom";
import datacenter from "@/assets/images/Datacenter.jpg";
import enterprise from "@/assets/images/Enterprise.jpg";
import networ_automation from "@/assets/images/Network Automation.jpg";
import performance from "@/assets/images/Performance.jpg";
import sdwan from "@/assets/images/SDWAN.jpg";
import security_integration from "@/assets/images/Security Integration.jpg";

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
  const images = [
    datacenter,
    enterprise,
    networ_automation,
    performance,
    sdwan,
    security_integration,
  ];

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-all duration-700 ${
        isArabic ? "rtl text-right" : "ltr text-left"
      }`}
    >
      {/* 🌐 HERO + INTRO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden pb-12">
        {/* الخلفية */}
        <div className="absolute inset-0">
          <img
            src={networkHero}
            alt="Network Hub"
            className="w-full h-full object-cover brightness-[1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-brand/80"></div>
          {/* تدرج اللون بين النهار والليل */}
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-brand dark:from-gray-900/90 to-transparent transition-colors duration-500"></div>
        </div>

        {/* المحتوى */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 sm:px-10 max-w-5xl flex flex-col items-center"
        >
          {/* العنوان والنص الرئيسي */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            {data.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl">
            {data.intro}
          </p>

          {/* زر CTA */}
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-primary to-brand text-white text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 mb-12"
          >
            {data.cta}
          </Button>

          {/* الفقرة التوضيحية */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed font-medium tracking-wide max-w-4xl ${
              isArabic ? "text-right" : "text-left"
            }`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            {data.introParagraph}
          </motion.p>
        </motion.div>
      </section>

      {/* 🚀 WHAT WE DELIVER */}
      <section className="relative py-10 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent"
          >
            {data.whatWeDeliverTitle}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10">
            {data.sections.map(
              (section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative flex flex-col items-center justify-center p-8 rounded-3xl shadow-lg overflow-hidden group h-full sm:h-full transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl"
                >
                  {/* 🖼️ خلفية الصورة */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${images[i]})` }}
                  />

                  {/* 🎨 غشاء تدرجي داكن يحسّن وضوح النص */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/80 to-black/60"></div>

                  {/* ✨ تأثير التوهج عند hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255,255,255,0.3), transparent 70%)",
                    }}
                  ></div>

                  {/* 💬 المحتوى */}
                  <div className="relative z-10 text-white drop-shadow-xl">
                    {/* الأيقونة والعنوان في نفس السطر */}
                    <div className="flex gap-3 mb-3">
                      <CheckCircle className="w-7 h-7 text-brand drop-shadow-md transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                      <p className="text-lg font-semibold tracking-wide text-white">
                        {section.title}
                      </p>
                    </div>

                    {/* الوصف */}
                    <p className="text-sm text-gray-200/90 max-w-full mx-auto leading-relaxed">
                      {section.desc}
                    </p>
                  </div>

                  {/* تأثير خفيف عند hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700"></div>
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
