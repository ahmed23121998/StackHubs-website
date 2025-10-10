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
    enterprise,
    datacenter,
    sdwan,
    networ_automation,
    security_integration,
    performance,
  ];

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-all duration-700 ${
        isArabic ? "rtl text-right" : "ltr text-left"
      }`}
    >
      {/* 🌐 HERO + INTRO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden px-6 py-20 sm:px-10">
        {/* الخلفية */}
        <div className="absolute inset-0">
          <img
            src={networkHero}
            alt="Network Hub"
            className="w-full h-full object-cover object-center brightness-90 md:brightness-100 scale-105"
          />
          {/* تدرج لوني لتوضيح النص */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-transparent"></div>
          {/* تدرج إضافي من اليمين إلى اليسار */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-brand/60 opacity-80"></div>
        </div>

        {/* المحتوى */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl flex flex-col items-center space-y-6"
        >
          {/* العنوان */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight">
            {data.title}
          </h1>

          {/* المقدمة */}
          <p
            className={`text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed font-medium max-w-3xl ${
              isArabic ? "text-right" : "text-left"
            }`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            {data.intro}
          </p>

          {/* الفقرة التوضيحية */}
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

          {/* زر CTA */}
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-primary to-brand text-white text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 mt-4"
          >
            {data.cta}
          </Button>
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
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent"
          >
            {data.whatWeDeliverTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.sections.map(
              (section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-600 flex flex-col"
                >
                  <div className="relative w-full h-[220px] bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
                    <img
                      src={images[i]}
                      alt={section.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-[1.02]"
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
