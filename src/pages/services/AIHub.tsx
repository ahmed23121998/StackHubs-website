import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aiHero from "@/assets/images/AI Hub.jpg";
import computer from "@/assets/images/AI Hub/1- Computer Vision.jpg";
import documentation from "@/assets/images/AI Hub/2- Document Intelligence (OCR + Forms + RPA).jpg";
import anomaly from "@/assets/images/AI Hub/3- Anomaly Detection & Predictive Maintenance.jpg";
import speech from "@/assets/images/AI Hub/4- Speech & Conversational AI.jpg";
import forcasting from "@/assets/images/AI Hub/5- Forecasting & Decision Optimization.jpg";

// تأثير الحركة
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const AIHub: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const data = t("aiHubPage", { returnObjects: true }) as any;
  const navigate = useNavigate();
  const images = [computer, documentation, anomaly, speech, forcasting];
  const introPoints: string[] = data.introParagraph
    .split(".")
    .filter((point: string) => point.trim().length > 0);
  const [showAll, setShowAll] = useState(false);
  const visiblePoints = showAll ? introPoints : introPoints.slice(0, 3);
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-all duration-700 ${
        isArabic ? "rtl text-right" : "ltr text-left"
      }`}
    >
      {/* 🧠 HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center overflow-hidden px-6 py-20 sm:px-10">
        {/* الخلفية */}
        <div className="absolute inset-0">
          <img
            src={aiHero}
            alt="AI Hub"
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
            className={`text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed font-medium max-w-3xl ${
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

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`text-base sm:text-lg md:text-xl text-gray-100 dark:text-gray-200 leading-relaxed font-medium tracking-wide max-w-3xl space-y-4 ${
              isArabic ? "text-right" : "text-left"
            }`}
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            {visiblePoints.map((point: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle
                  className={`w-6 h-6 text-blue-400 flex-shrink-0 mt-1 ${
                    isArabic ? "ml-2" : "mr-2"
                  }`}
                />
                <span>{point.trim()}.</span>
              </motion.li>
            ))}

            {/* عرض المزيد / أقل مع سهم متغير الاتجاه */}
            {introPoints.length > 3 && (
              <li className="flex justify-center mt-2">
                <div
                  onClick={() => setShowAll(!showAll)}
                  className={`flex items-center gap-2 cursor-pointer select-none text-pink-500 hover:text-pink-600 text-base font-semibold transition-all duration-300 underline-offset-4 hover:underline`}
                >
                  {/* لو اللغة عربية السهم في اليمين */}
                  {isArabic && (
                    <ArrowRight
                      className={`w-4 h-4 text-pink-500 transform transition-transform duration-300 ${
                        showAll ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  )}

                  <span>
                    {showAll
                      ? isArabic
                        ? "عرض أقل"
                        : "Show less"
                      : isArabic
                      ? "عرض المزيد"
                      : "Read more"}
                  </span>

                  {/* لو اللغة إنجليزية السهم في اليسار */}
                  {!isArabic && (
                    <ArrowRight
                      className={`w-4 h-4 text-pink-500 transform transition-transform duration-300 ${
                        showAll ? "-rotate-90" : "rotate-90"
                      }`}
                    />
                  )}
                </div>
              </li>
            )}
          </motion.ul>
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
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent drop-shadow-lg"
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
                      src={images[i] || aiHero}
                      alt={section.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col px-6 pt-5 pb-6 flex-1">
                    <div className="flex items-start gap-3 h-[64px]">
                      <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <ul
                        className={`text-gray-700 dark:text-gray-300 leading-relaxed text-sm list-none space-y-2 ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                        style={{ direction: isArabic ? "rtl" : "ltr" }}
                      >
                        {section.desc
                          .split(".")
                          .filter((point: string) => point.trim().length > 0)
                          .map((point: string, index: number) => (
                            <li
                              key={index}
                              className={"flex items-start gap-2"}
                              style={{ direction: isArabic ? "rtl" : "ltr" }}
                            >
                              <ArrowRight
                                className={`w-4 h-4 text-brand mt-1 flex-shrink-0 transform ${
                                  isArabic ? "rotate-180 ml-2" : "mr-2"
                                }`}
                              />
                              <span>{point.trim()}.</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* ✅ صف ثاني فيه 2 كروت في النص */}
          <div className="flex justify-center gap-8 flex-wrap">
            {data.sections
              .slice(3, 5)
              .map((section: { title: string; desc: string }, i: number) => (
                <motion.div
                  key={i + 3}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="w-full sm:w-[calc(50%-1rem)] md:w-[350px] bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-600 flex flex-col"
                >
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <img
                      src={images[i + 3] || aiHero}
                      alt={section.title}
                      className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="flex flex-col px-6 pt-5 pb-6 flex-1">
                    <div className="flex items-start gap-3 h-[64px]">
                      <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                        {section.title}
                      </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <ul
                        className={`text-gray-700 dark:text-gray-300 leading-relaxed text-sm list-none space-y-2 ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                        style={{ direction: isArabic ? "rtl" : "ltr" }}
                      >
                        {section.desc
                          .split(".")
                          .filter((point: string) => point.trim().length > 0)
                          .map((point: string, index: number) => (
                            <li
                              key={index}
                              className={"flex items-start gap-2"}
                              style={{ direction: isArabic ? "rtl" : "ltr" }}
                            >
                              <ArrowRight
                                className={`w-4 h-4 text-brand mt-1 flex-shrink-0 transform ${
                                  isArabic ? "rotate-180 ml-2" : "mr-2"
                                }`}
                              />
                              <span>{point.trim()}.</span>
                            </li>
                          ))}
                      </ul>
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

export default AIHub;
