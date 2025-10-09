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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = t("networkHubPage", { returnObjects: true }) as any;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-500">
      {/* 🌅 HERO SECTION */}
      <section className="relative flex items-center justify-center h-[85vh] text-center transition-all duration-700">
        {/* الصورة الخلفية */}
        <div className="absolute inset-0">
          <img
            src={networkHero}
            alt="Network Hub"
            className="w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5] transition-all duration-700"
          />
          {/* التدرج اللوني مختلف في النهار والليل */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-brand/70 dark:from-gray-900/90 dark:to-brand/80 mix-blend-multiply transition-all duration-700"></div>
        </div>

        {/* النصوص */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 sm:px-10 max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            {data.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
            {data.intro}
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300
              bg-gradient-to-r from-primary to-brand text-white
              dark:bg-gradient-to-r dark:from-primary dark:to-brand dark:text-white"
          >
            {data.cta}
          </Button>
        </motion.div>

        {/* تأثير الضوء الخفيف في الوضع الليلي */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary/10 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* 💡 WHAT WE DELIVER */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/70 to-white dark:from-gray-800/70 dark:to-gray-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-brand bg-clip-text text-transparent"
          >
            {data.whatWeDeliverTitle}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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

      {/* 🚀 CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-r from-primary to-brand dark:from-gray-900 dark:to-brand text-white text-center overflow-hidden transition-all duration-700">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] dark:opacity-30"></div>

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
            className="text-lg font-semibold px-10 py-5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300
              bg-gradient-to-r from-primary to-brand text-white
              dark:bg-gradient-to-r dark:from-primary dark:to-brand dark:text-white"
          >
            {data.ctaButton}
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default NetworkHubPage;
