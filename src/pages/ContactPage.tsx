import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactForm from "@/components/ui/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import contact from "@/assets/images/contact_us.jpg";
import background from "@/assets/images/backgrond_contact.png";
import facebook from "@/assets/images/facebook.png";
import instagram from "@/assets/images/instagram.jpeg";
import twitter from "@/assets/images/twitter.png";
import linkedin from "@/assets/images/linkedin.png";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen py-16 dark:bg-gray-900 bg-gray-50 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* <div className="absolute inset-0 bg-black/30 dark:bg-black/60"></div> */}

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* ====== Header ====== */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            {t("contact.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-200 max-w-2xl mx-auto"
          >
            {t("contact.subtitle")}
          </motion.p>
        </div>

        {/* ====== Row 1: Form + Image ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <ContactForm />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700">
              <img
                src={contact}
                alt="Contact Illustration"
                className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out brightness-95 dark:brightness-75"
              />
            </div>
          </motion.div>
        </div>

        {/* ====== Row 2: Social Icons ====== */}
        <div className="flex justify-center gap-8 mb-16 flex-wrap">
          {[
            {
              name: "Facebook",
              href: "https://www.facebook.com/share/14HeWajLPGG/?mibextid=wwXIfr",
              icon: facebook,
            },
            {
              name: "Instagram",
              href: "https://www.instagram.com/stackhubs_global",
              icon: instagram,
            },
            {
              name: "Twitter",
              href: "https://x.com/Stackhubs_Globa",
              icon: twitter,
            },
            {
              name: "LinkedIn",
              href: "https://www.linkedin.com/company/stackhubs-global/",
              icon: linkedin,
            },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border border-white/30 hover:scale-110 hover:shadow-2xl transition-transform duration-300"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-full h-full object-fill"
              />
            </motion.a>
          ))}
        </div>

        {/* ====== Row 3: Email + Phone ====== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email */}
          <motion.a
            href="mailto:info@stackhubs.global"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-300/40 dark:border-gray-700/40 shadow-lg backdrop-blur-sm hover:shadow-xl transition"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-500 text-white">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("contact.form.email")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("contact.info.email")}
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+201149958181"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-300/40 dark:border-gray-700/40 shadow-lg backdrop-blur-sm hover:shadow-xl transition"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-pink-500 text-white">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("contact.form.phone")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("contact.info.phone")}
              </p>
            </div>
          </motion.a>
        </div>

        {/* ====== Row 4: Address Centered ====== */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-12"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=Stackhubs%20Global"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-2xl bg-white/70 dark:bg-gray-800/60 border border-gray-300/40 dark:border-gray-700/40 shadow-lg backdrop-blur-sm hover:shadow-xl transition"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-500 text-white">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {t("contact.form.address")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("contact.info.address")}
              </p>
            </div>
          </a>
        </motion.div>

        {/* ====== Row 5: Map Preview ====== */}
        <div className="flex justify-center">
          <iframe
            title="Stackhubs Location"
            src="https://www.google.com/maps?q=30.0444,31.2357&hl=ar&z=14&output=embed"
            className="w-full md:w-3/4 h-80 rounded-2xl border-4 border-white/30 shadow-xl"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
