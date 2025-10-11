import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import wirelessHero from "@/assets/images/Wireless Hub.jpg";
import RF_strategy from "@/assets/images/Wireless Hub/1- RF Strategy, Predictive Design & On-Site Validation.jpg";
import High_density from "@/assets/images/Wireless Hub/2- High-Density Performance Engineering (Wi-Fi 6_6E_7-ready).jpg";
import secure from "@/assets/images/Wireless Hub/3- Secure Access & Segmentation (Prod _ Guest).jpg";
import iot from "@/assets/images/Wireless Hub/4- IoT & Location Services.jpg";
import controllers from "@/assets/images/Wireless Hub/5- Controllers, Cloud-Managed Ops & Automation.jpg";
import assurance from "@/assets/images/Wireless Hub/6- Assurance, KPIs & Continuous Optimization.jpg";
import guest_access from "@/assets/images/Wireless Hub/7- Guest Access & Captive Portal Experience.jpg";
import documentation from "@/assets/images/Wireless Hub/8- Documentation.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const WirelessHubPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  // 🔹 المحتوى من JSON
  const data = t("wirelessHubPage", { returnObjects: true }) as any;
  const images = [
    RF_strategy,
    High_density,
    secure,
    iot,
    controllers,
    assurance,
    guest_access,
    documentation,
  ];

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-all duration-700 ${
        isArabic ? "rtl text-right" : "ltr text-left"
      }`}
    >
      {/* 🌐 HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden px-6 py-20 sm:px-10">
        {/* الخلفية */}
        <div className="absolute inset-0">
          <img
            src={wirelessHero}
            alt="Wireless Hub"
            className="w-full h-full object-cover object-center brightness-90 md:brightness-100 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-brand/60 opacity-50"></div>
        </div>

        {/* المحتوى */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl flex flex-col items-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight">
            {data.title}
          </h1>

          <p
            className={`text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed font-medium max-w-4xl ${
              isArabic ? "text-right" : "text-left"
            }`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            {data.intro}
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-[#DF1783] text-white text-lg px-10 py-5 rounded-full hover:scale-105 hover:shadow-2xl hover:bg-pink-500 transition-all duration-300"
          >
            {data.cta}
          </Button>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed font-medium tracking-wide max-w-3xl ${
              isArabic ? "text-right" : "text-left"
            }`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            {data.introParagraph}
          </motion.p>
        </motion.div>
      </section>

      {/* 🚀 WHAT WE DELIVER */}
      <section className="relative py-20 bg-white dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-purple-600"
          >
            {data.whatWeDeliverTitle}
          </motion.h2>

          {/* ✅ صف أول فيه 3 كروت */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {data.sections
              .slice(0, 3)
              .map((section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-600 flex flex-col"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={images[i]}
                      alt={section.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col px-6 pt-5 pb-6 flex-1">
                    <div className="flex items-start gap-3 h-[64px]">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {section.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* ✅ صف ثاني فيه 3 كروت */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {data.sections
              .slice(3, 6)
              .map((section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i + 3}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-600 flex flex-col"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={images[i + 3]}
                      alt={section.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col px-6 pt-5 pb-6 flex-1">
                    <div className="flex items-start gap-3 h-[64px]">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {section.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* ✅ صف أخير فيه 2 كروت في النص */}
          <div className="flex justify-center gap-8 flex-wrap">
            {data.sections
              .slice(6, 8)
              .map((section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i + 6}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="w-full sm:w-[calc(50%-1rem)] md:w-[350px] bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-600 flex flex-col"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={images[i + 6]}
                      alt={section.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col px-6 pt-5 pb-6 flex-1">
                    <div className="flex items-start gap-3 h-[64px]">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {section.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
            className="bg-[#DF1783] text-white text-lg px-10 py-5 rounded-full hover:scale-105 hover:shadow-2xl hover:bg-pink-500 transition-all duration-300"
          >
            {data.ctaButton}
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default WirelessHubPage;
