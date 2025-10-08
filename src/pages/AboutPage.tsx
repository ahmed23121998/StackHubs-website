import React from "react";
import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-brand text-white py-20">
        <div className="max-w-5xl mx-auto py-12 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            {t("about.heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg md:text-xl max-w-3xl mx-auto"
          >
            {t("about.heroSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            {t("about.whatWeDeliver.title")}
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {(
              t("about.whatWeDeliver.items", { returnObjects: true }) as {
                title: string;
                desc: string;
              }[]
            ).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-12"
          >
            {t("about.whyUs.title")}
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-3">
            {(
              t("about.whyUs.items", { returnObjects: true }) as {
                title: string;
                desc: string;
              }[]
            ).map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Mission */}
      <section className="py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          {t("about.join.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg max-w-3xl mx-auto mb-8 text-gray-700 dark:text-gray-300"
        >
          {t("about.join.subtitle")}
        </motion.p>
        {/* <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
          onClick={() => (window.location.href = "https://www.stackhubs.com")}
        >
          {t("about.join.cta")}
        </Button> */}
      </section>
    </div>
  );
};

export default AboutPage;
