import React, { useEffect, useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { serviceHubs } from "@/data/serviceHubs";
import { useNavigate } from "react-router-dom";
import about_11_1 from "@/assets/images/about_11_1.jpg";
import about_11_2 from "@/assets/images/about_11_2.jpg";
import about_11_3 from "@/assets/images/about_11_3.jpg";
import regional_footprint from "@/assets/images/regional_footprint.png";
import happy_customers from "@/assets/images/happy_customers.jpg";
import partners from "@/assets/images/partners.jpg";
import solution from "@/assets/images/solution.jpg";
// import brand_6_2 from "@/assets/images/brand_6_2.png";
// import brand_6_3 from "@/assets/images/brand_6_3.png";
// import brand_6_4 from "@/assets/images/brand_6_4.png";
// import brand_6_5 from "@/assets/images/brand_6_5.png";
// import cat_1 from "@/assets/images/cta-1.jpg";
// import cat_2 from "@/assets/images/cta-2.jpg";
import project_7_1 from "@/assets/images/project_7_1.jpg";
import project_7_2 from "@/assets/images/project_7_2.jpg";
import project_7_3 from "@/assets/images/project_7_3.jpg";
import choose_2 from "@/assets/images/choose_2.jpg";
import { Check } from "lucide-react";

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);
  const hubs = useMemo(() => serviceHubs(t), [i18n.language, t]);
  type AnimatedCounterProps = {
    value: number;
    suffix?: string;
  };

  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    suffix = "",
  }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
      if (!isInView) return;
      let start = 0;
      const duration = 2000;
      const step = 16;
      const increment = value / (duration / step);

      const interval = setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, step);

      return () => clearInterval(interval);
    }, [isInView, value]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-gray-100">
      {/* 🌟 Hero Section */}
      <section className="relative w-full">
        <Swiper
          key={i18n.language}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          speed={1200}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] hero-swiper"
        >
          {hubs.map((hub, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* 🖼️ الخلفية */}
                <img
                  src={hub.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover brightness-[0.6] transition-all duration-1000 group-hover:brightness-75"
                />

                {/* 🎬 تدرج ناعم من أسفل */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* ✨ المحتوى */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-16">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 leading-tight"
                  >
                    {hub.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                  >
                    {hub.subtitle}
                  </motion.p>

                  {t("hero.cta") && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Button
                        size="lg"
                        variant="secondary"
                        className="text-lg px-10 py-5 bg-gradient-to-r from-primary to-brand text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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

      {/* 🌟 Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 🔹 Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            {t("services.title")}
          </motion.h2>

          {/* 🔹 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hubs.map((hub, index) => (
              <motion.div
                key={hub.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Icon */}
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  {/* توهج ناعم متدرج */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-brand opacity-20 blur-md animate-soft-pulse"></div>

                  {/* الأيقونة نفسها */}
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-brand/30 shadow-md group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={hub.icon}
                      alt={hub.title}
                      className="w-10 h-10 object-contain animate-soft-pulse group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {hub.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {hub.subtitle}
                </p>

                <span
                  onClick={() => navigate(`/services/${hub.id}`)}
                  className="mt-auto inline-flex items-center gap-1 font-medium text-brand hover:text-primary cursor-pointer transition-all duration-300"
                >
                  {t("services.learnMore")}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </motion.div>
            ))}
          </div>

          {/* 🌈 Gradient Pulse Button */}
          <div className="flex justify-center mt-14">
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              onClick={() => navigate("/services")}
              className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-primary to-brand bg-[length:200%_200%] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-gradient-pulse"
            >
              {t("services.viewAll")}
              <span className="transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* 🌟 Stats Section */}
      <section className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              {
                value: "80+",
                title: t("stats.roiTitle"),
                desc: t("stats.roiDesc"),
                image: happy_customers,
                color: "#44B3E1",
              },
              {
                value: "50+",
                title: t("stats.keywordsTitle"),
                desc: t("stats.keywordsDesc"),
                image: solution,
                color: "#DF1783",
              },
              {
                value: "40+",
                title: t("stats.campaignsTitle"),
                desc: t("stats.campaignsDesc"),
                image: partners,
                color: "#E97132",
              },
              {
                value: "10+",
                title: t("stats.regionalFootprintTitle"),
                desc: t("stats.regionalFootprintDesc"),
                image: regional_footprint,
                color: "#215C98",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col items-center justify-center p-8 rounded-3xl shadow-lg overflow-hidden group h-64 sm:h-72 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl"
              >
                {/* 🖼️ خلفية الصورة */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${stat.image})` }}
                />

                {/* 🎨 غشاء تدرجي داكن يحسّن وضوح النص */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>

                {/* ✨ تدرج لوني ناعم فوق الغشاء (هوية بصرية) */}
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-40 group-hover:opacity-60 transition-all duration-700"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}55, transparent 70%)`,
                  }}
                ></div>

                {/* 💫 تأثير التوهج عند hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}66, transparent 70%)`,
                  }}
                ></div>

                {/* 💬 المحتوى */}
                <div className="relative z-10 text-white drop-shadow-xl">
                  {/* الرقم */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-extrabold mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: stat.color }}
                  >
                    <AnimatedCounter
                      value={Number(stat.value.replace(/\D/g, ""))}
                      suffix="+"
                    />
                  </motion.h3>

                  {/* العنوان */}
                  <p className="text-lg font-semibold mb-2 tracking-wide text-white">
                    {stat.title}
                  </p>

                  {/* الوصف */}
                  <p className="text-sm text-gray-200/90 max-w-[230px] mx-auto leading-relaxed">
                    {stat.desc}
                  </p>
                </div>

                {/* تأثير خفيف عند hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* النصوص والنقاط */}
          <div>
            <p className="text-brand font-semibold uppercase tracking-wide mb-2">
              {t("aboutUs.whoWeAre")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("aboutUs.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("aboutUs.description")}
            </p>

            {/* ✅ نقاط العناوين والأوصاف */}
            <ul className="space-y-5 mb-10">
              {(
                t("aboutUs.points", { returnObjects: true }) as {
                  title: string;
                  desc: string;
                }[]
              ).map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-3 rounded-xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300"
                >
                  {/* ✅ دائرة بتدرّج لوني من الأزرق الداكن للفاتح */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-primary to-brand text-white flex-shrink-0 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>

                  {/* ✅ النصوص */}
                  <div>
                    <h4 className="font-semibold text-primary dark:text-brand mb-1">
                      {point.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/70 transition"
              onClick={() => navigate("/about")}
            >
              {t("aboutUs.cta")} →
            </button>
          </div>

          {/* الصور */}
          <div className="grid grid-cols-2 gap-4 relative">
            <img
              src={about_11_1}
              alt="About 1"
              className="rounded-xl object-cover h-60 w-full"
            />
            <img
              src={about_11_2}
              alt="About 2"
              className="rounded-xl object-cover h-60 w-full"
            />
            <img
              src={about_11_3}
              alt="About 3"
              className="rounded-xl object-cover h-60 w-full col-span-2"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
              <span className="text-4xl font-extrabold leading-none text-white">
                {t("aboutUs.numofyears")}
              </span>
              <span className="text-sm md:text-base font-medium leading-snug text-white">
                {t("aboutUs.experience")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 Why Choose Us Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 py-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ✅ Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={choose_2}
                alt="Team"
                className="object-cover w-full h-[500px] md:h-[600px]"
                loading="lazy"
              />
              {/* ظل لوني ثابت */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 to-brand/25 mix-blend-multiply pointer-events-none" />
            </div>
          </motion.div>

          {/* ✅ Right Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-brand font-semibold uppercase tracking-wide block mb-2">
              {t("whyChooseUs.badge")}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug mt-2 mb-6">
              {t("whyChooseUs.title")}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
              {t("whyChooseUs.description")}
            </p>

            {/* ✅ النقاط */}
            <ul className="space-y-5">
              {(
                t("whyChooseUs.points", { returnObjects: true }) as {
                  title: string;
                  desc?: string;
                }[]
              ).map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* أيقونة بتدرّج لوني */}
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-primary to-brand rounded-full mr-4 mt-1 text-white shadow-md">
                    <Check className="w-4 h-4" />
                  </span>

                  {/* نص النقطة */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {point.title}
                    </h4>
                    {point.desc && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 leading-relaxed">
                        {point.desc}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("caseStudies.title")}
            </h2>
          </motion.div>

          {/* Swiper Slider */}
          <Swiper
            key={i18n.language}
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={2000}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="mb-12"
          >
            {Array(6)
              .fill([
                {
                  src: project_7_1,
                  tagKey: "projects.dataAnalytics.tag",
                  titleKey: "projects.dataAnalytics.title",
                },
                {
                  src: project_7_2,
                  tagKey: "projects.itSolution.tag",
                  titleKey: "projects.itSolution.title",
                },
                {
                  src: project_7_3,
                  tagKey: "projects.cloudSecurity.tag",
                  titleKey: "projects.cloudSecurity.title",
                },
              ])
              .flat()
              .map((project, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.2 }}
                    className="transition transform cursor-pointer"
                    onClick={() => navigate(`/projects/${(i % 3) + 1}`)}
                  >
                    <img
                      src={project.src}
                      alt={t(project.titleKey)}
                      className="w-full h-56 object-cover rounded-2xl"
                    />
                    <div className="p-2">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                        {t(project.tagKey)}
                      </p>
                      <h3 className="text-lg font-semibold">
                        {t(project.titleKey)}
                      </h3>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Button
              className="bg-primary text-white hover:bg-primary/70 rounded-full px-8 py-3 transition"
              onClick={() => navigate("/projects")}
            >
              {t("caseStudies.button")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Partners / CTA Section */}
      {/* <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg py-16 px-8 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="w-60 h-48 overflow-hidden rounded-lg shadow-md [clip-path:polygon(0%_0,80%_0,100%_100%,0%_100%)]">
                <img
                  src={cat_1}
                  alt="Team Left"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center px-4">
                <p className="text-brand font-semibold mb-3 uppercase tracking-wide">
                  {t("partners.subtitle")}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t("partners.title")}
                </h2>
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8 py-4 bg-[#DF1783] text-white hover:bg-primary/70 m-8 rounded-full"
                    onClick={() => navigate("/contact")}
                  >
                    {t("partners.cta")}
                  </Button>

                  <a
                    href="tel:01149958181"
                    className="flex items-center gap-4 bg-primary hover:bg-primary/70 dark:bg-primary px-5 py-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 transition cursor-pointer"
                  >
                    <span className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
                      📞
                    </span>

                    <div className="flex flex-col leading-tight">
                      <span className="text-lg font-bold text-white dark:text-white">
                        01149958181
                      </span>
                      <span className="text-sm text-gray-400 dark:text-gray-400">
                        {t("partners.phoneNote")}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-60 h-48 overflow-hidden rounded-lg shadow-md [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]">
                <img
                  src={cat_2}
                  alt="Team Right"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 -mt-10 flex justify-center">
            <div className="bg-primary dark:bg-primary rounded-3xl py-12 px-10 shadow-lg max-w-5xl w-full">
              <div className="flex flex-wrap items-center justify-center gap-12">
                {[brand_6_2, brand_6_3, brand_6_4, brand_6_5].map((logo, i) => (
                  <motion.img
                    key={i}
                    src={logo}
                    alt={`Brand ${i + 1}`}
                    className="h-10 brightness-200 opacity-80 hover:opacity-100 transition"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
