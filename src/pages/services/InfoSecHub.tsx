// src/pages/InfoSecHubPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Cybersecurity from "@/assets/images/InfoSec Hub/Cybersecurity Architecture & Governance.jpg";
import Governance from "@/assets/images/InfoSec Hub/Governance, Risk & Compliance (GRC).jpg";
import Access_Management from "@/assets/images/InfoSec Hub/Identity & Access Management (IAM _ PAM).jpg";
import Cloud from "@/assets/images/InfoSec Hub/Network & Cloud Security.jpg";
import Penetration from "@/assets/images/InfoSec Hub/Penetration Testing & Assessment Services.jpg";
import Threat_Detection from "@/assets/images/InfoSec Hub/Threat Detection & Incident Response (SOC _ SOAR).jpg";
import infosec from "@/assets/images/InfoSec Hub 1.jpg";
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const InfoSecHubPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const data = t("infoSecHubPage", { returnObjects: true }) as any;
  const navigate = useNavigate();

  const images = [Cybersecurity, Governance, Access_Management, Cloud, Penetration, Threat_Detection];

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-all duration-700 ${
        isArabic ? "rtl text-right" : "ltr text-left"
      }`}
    >
      {/* 🌐 HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden p-12">
        <div className="absolute inset-0">
          <img
            src={infosec}
            alt="InfoSec Hub"
            className="w-full h-full object-cover brightness-[1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-brand/80"></div>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-brand dark:from-gray-900/90 to-transparent"></div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 sm:px-10 max-w-5xl flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            {data.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl">
            {data.intro}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="bg-gradient-to-r from-primary to-brand text-white text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 mb-12"
          >
            {data.cta}
          </Button>
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

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {data.sections.map(
              (section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-600"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={images[i]}
                      alt={section.title}
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {section.desc}
                    </p>
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

export default InfoSecHubPage;
