import React, { useEffect, useState, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { serviceHubs } from "@/data/serviceHubs";
import { useNavigate } from "react-router-dom";
import video1 from "@/assets/video/who we are.mp4";
import video2 from "@/assets/video/who we are 2.mp4";
import video3 from "@/assets/video/who we are 3.mp4";
import regional_footprint from "@/assets/images/regional_footprint.png";
import happy_customers from "@/assets/images/happy_customers.jpg";
import partners from "@/assets/images/partners.jpg";
import solution from "@/assets/images/solution.jpg";
import elazaby from "@/assets/images/elazaby.jpg";
import ghazala from "@/assets/images/ghazala.jpg";
import habib from "@/assets/images/habib.jpg";
import Egypt from "@/assets/images/Egypt.png";
import Emarat from "@/assets/images/Emarat.png";
import choose_2 from "@/assets/images/choose_2.jpg";
import { Check, ArrowUp } from "lucide-react";
import AutoPlayVideo from "@/components/ui/AutoPlayVideo";
import parttner1 from "@/assets/images/Parttner/Picture1.png";
import parttner2 from "@/assets/images/Parttner/Picture2.png";
import parttner3 from "@/assets/images/Parttner/Picture3.png";
import parttner4 from "@/assets/images/Parttner/Picture4.png";
import parttner5 from "@/assets/images/Parttner/Picture5.png";
import parttner6 from "@/assets/images/Parttner/Picture6.png";
import parttner7 from "@/assets/images/Parttner/Picture7.png";
import parttner8 from "@/assets/images/Parttner/Picture8.png";
import parttner9 from "@/assets/images/Parttner/Picture9.png";
import parttner10 from "@/assets/images/Parttner/Picture10.png";
import parttner11 from "@/assets/images/Parttner/Picture11.png";
import parttner12 from "@/assets/images/Parttner/Picture12.png";
import parttner13 from "@/assets/images/Parttner/Picture13.png";
import parttner14 from "@/assets/images/Parttner/Picture14.png";
import parttner15 from "@/assets/images/Parttner/Picture15.png";

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);
  const hubs = useMemo(() => serviceHubs(t), [i18n.language, t]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parttners = [
    parttner1,
    parttner2,
    parttner3,
    parttner4,
    parttner5,
    parttner6,
    parttner7,
    parttner8,
    parttner9,
    parttner10,
    parttner11,
    parttner12,
    parttner13,
    parttner14,
    parttner15,
  ];

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
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" /> */}

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
      <section className="py-20  bg-gray-50 dark:bg-gray-900 dark:from-gray-950 dark:to-gray-900">
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

      {/* Case Studies Section */}
      <section className="py-20 dark:bg-gray-900">
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
                  src: elazaby,
                  id: "elEzabyProject",
                  country: "Egypt",
                  flag: Egypt,
                  field: "Pharma",
                },
                {
                  src: ghazala,
                  id: "ghazalaProject",
                  country: "Egypt",
                  flag: Egypt,
                  field: "Hospitality",
                },
                {
                  src: habib,
                  id: "habibProject",
                  country: "UAE",
                  flag: Emarat,
                  field: "Legal Services",
                },
              ])
              .flat()
              .map((project, i) => (
                <SwiperSlide key={`${project.id}-${i}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.2 }}
                    className="transition transform cursor-pointer"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <img
                      src={project.src}
                      alt={t(`projectDetails.${project.id}.title`)}
                      className="w-full h-56 object-fill rounded-xl"
                    />

                    <div className="p-3">
                      {/* ✅ صف يحتوي على الدولة والمجال */}
                      <div className="flex items-center justify-between mb-2">
                        {/* اليسار: علم + اسم الدولة */}
                        <div className="flex items-center gap-2">
                          <img
                            src={project.flag}
                            alt={`${project.country} flag`}
                            className="w-6 h-4 object-cover rounded-sm"
                          />
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                            {project.country}
                          </span>
                        </div>

                        {/* اليمين: المجال */}
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {project.field}
                        </span>
                      </div>

                      {/* العنوان الرئيسي */}
                      <h3 className="text-lg font-semibold">
                        {t(`projectDetails.${project.id}.title`)}
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
              size="lg"
              variant="secondary"
              className="group relative inline-flex items-center gap-2 px-10 py-6 rounded-full text-lg font-semibold text-white 
             bg-gradient-to-r from-primary via-brand to-primary 
             bg-[length:200%_200%] shadow-lg hover:shadow-2xl hover:scale-105 
             transition-all duration-500 animate-gradient-pulse"
              onClick={() => navigate("/projects")}
            >
              {t("caseStudies.button")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* الشبكة (النص + الفيديوهات) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            </div>

            {/* ✅ الفيديوهات */}
            <div className="grid grid-cols-2 gap-4 relative">
              <AutoPlayVideo src={video1} />
              <AutoPlayVideo src={video2} />
              <div className="col-span-2">
                <AutoPlayVideo src={video3} />
              </div>
            </div>
          </div>

          {/* ✅ الزرار المتحرك في المنتصف تحت العمودين */}
          {/* <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              onClick={() => navigate("/about")}
              className="group relative inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg font-semibold text-white 
                   bg-gradient-to-r from-primary via-brand to-primary 
                   bg-[length:200%_200%] shadow-lg hover:shadow-2xl hover:scale-105 
                   transition-all duration-500 animate-gradient-pulse"
            >
              {t("aboutUs.cta")}
              <span className="transform transition-transform group-hover:translate-x-1">
                →
              </span>
            </motion.button>
          </div> */}
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

      {/* 🌟 Our Partners Section */}
      <section className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* العنوان */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("partners.ourPartners") || "Our Partners"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t("partners.subtitle") ||
                "Trusted by industry leaders worldwide"}
            </p>
          </motion.div>

          {/* السلايدر */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Swiper
              key={i18n.language}
              modules={[Autoplay]}
              spaceBetween={40}
              slidesPerView={2}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1200}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 20 },
                640: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 4, spaceBetween: 35 },
                1024: { slidesPerView: 5, spaceBetween: 40 },
                1280: { slidesPerView: 5, spaceBetween: 50 },
              }}
              className="partners-swiper"
            >
              {parttners.map((partner, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-center justify-center group"
                  >
                    <div className="relative w-40 h-24 md:w-96 md:h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-400 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/40 hover:shadow-2xl hover:scale-110 transition-all duration-500 backdrop-blur-sm">
                      <img
                        src={partner}
                        alt={`Partner ${index + 1}`}
                        className="max-w-[90%] max-h-[90%] object-fill transition-all duration-500 opacity-80 hover:opacity-100"
                      />
                      {/* توهج خفيف عند المرور */}
                      <div className="absolute inse t-0 rounded-2xl bg-gradient-to-r from-primary/10 to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* النص التوضيحي أسفل السلايدر */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-14"
          >
            <p className="text-gray-800 dark:text-gray-400 text-sm md:text-base max-w-3xl mx-auto">
              {t("partners.description") ||
                "We collaborate with global brands to create meaningful partnerships that drive innovation and success."}
            </p>
          </motion.div>
        </div>

        {/* خلفية زخرفية بسيطة */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-brand/5 opacity-40 pointer-events-none" />
      </section>

      {/* زر الرجوع للأعلى */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-4 p-3 rounded-full bg-[#44B3E1] hover:bg-[#215C98]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
