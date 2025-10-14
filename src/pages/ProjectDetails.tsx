import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import project_1 from "@/assets/images/project_7_1.jpg";
import project_2 from "@/assets/images/project_7_2.jpg";
import project_3 from "@/assets/images/project_7_3.jpg";
import elezaby from "@/assets/images/elazaby.jpg";
import elezabylogo from "@/assets/images/elazaby logo.jpg";
import {
  Building2,
  Network,
  Cpu,
  MapPin,
  Globe,
  Clock,
  Headphones,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const projectMap: Record<string, { image: string; key: string }> = {
  "data-analytics": { image: project_1, key: "dataAnalytics" },
  "it-solution": { image: project_2, key: "itSolution" },
  "cloud-security": { image: project_3, key: "cloudSecurity" },
  elazaby: { image: elezaby, key: "elEzabyProject" },
};

interface ProjectDetail {
  title: string;
  summary: string;
  hero: string;
  challenge: string;
  approach: string;
  outcome: string;
  highlights?: Record<string, string>;
  testimonial: string;
}

// مكون Read More قابل لإعادة الاستخدام
const ReadMoreSection = ({
  content,
  isArabic,
  color = "blue",
}: {
  content: string;
  isArabic: boolean;
  color?: string;
  icon: React.ElementType;
}) => {
  const [showAll, setShowAll] = useState(false);
  const points = content.split(".").filter((point) => point.trim().length > 0);
  const visiblePoints = showAll ? points : points.slice(0, 1);
  const hasMore = points.length > 1;

  const colorClasses = {
    orange: {
      bg: "from-orange-500 to-orange-600",
      border: "border-orange-400",
      text: "text-orange-200",
      icon: "text-orange-200",
    },
    blue: {
      bg: "from-blue-500 to-indigo-600",
      border: "border-blue-400",
      text: "text-blue-200",
      icon: "text-blue-200",
    },
    purple: {
      bg: "from-purple-500 to-pink-600",
      border: "border-purple-400",
      text: "text-purple-200",
      icon: "text-purple-200",
    },
  };

  const currentColor =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="flex-1 flex flex-col">
      <motion.ul className="space-y-4 flex-1">
        {visiblePoints.map((point: string, index: number) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <CheckCircle
              className={`w-5 h-5 ${currentColor.icon} flex-shrink-0 mt-1 ${
                isArabic ? "ml-2" : "mr-2"
              }`}
            />
            <span className={`${currentColor.text} leading-relaxed flex-1`}>
              {point.trim()}.
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {/* زر Read More */}
      {hasMore && (
        <div className={`mt-4 pt-4 border-t ${currentColor.border}/30`}>
          <div
            onClick={() => setShowAll(!showAll)}
            className={`flex items-center gap-2 cursor-pointer select-none ${
              currentColor.text
            } hover:text-white font-semibold transition-all duration-300 justify-center ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <span>
              {showAll
                ? isArabic
                  ? "عرض أقل"
                  : "Show less"
                : isArabic
                ? "عرض المزيد"
                : "Read more"}
            </span>
            <ArrowRight
              className={`w-4 h-4 transform transition-transform duration-300 ${
                showAll ? "-rotate-90" : "rotate-90"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  const project = projectMap[id ?? ""];
  if (!project) {
    return (
      <section className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-7xl font-bold text-primary dark:text-brand mb-2">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
            {isArabic ? "عذرًا، المشروع غير موجود" : "Oops! Project Not Found"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto mb-6">
            {isArabic
              ? "يبدو أنك حاولت الوصول إلى مشروع غير موجود أو تم حذفه."
              : "It seems you tried to access a project that doesn't exist or has been removed."}
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-brand text-white rounded-full px-8 py-4 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            onClick={() => navigate("/projects")}
          >
            {isArabic ? "العودة إلى المشاريع" : "Back to Projects"}
          </Button>
        </motion.div>
      </section>
    );
  }

  const data = t(`projectDetails.${project.key}`, {
    returnObjects: true,
  }) as unknown as ProjectDetail;

  const colorMap: Record<string, string> = {
    industry: "from-orange-500 to-amber-400",
    scope: "from-blue-500 to-cyan-400",
    technology: "from-purple-500 to-pink-500",
    availability: "from-indigo-500 to-sky-400",
    connectivity: "from-rose-500 to-red-400",
    timeline: "from-teal-500 to-emerald-400",
    service: "from-violet-500 to-purple-400",
  };

  const iconMap: Record<string, React.ElementType> = {
    industry: Building2,
    scope: MapPin,
    technology: Cpu,
    availability: Network,
    connectivity: Globe,
    timeline: Clock,
    service: Headphones,
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  const [showAllSummary, setShowAllSummary] = useState(false);
  const introPoints: string[] = data.summary
    .split(".")
    .filter((point: string) => point.trim().length > 0);
  const visiblePoints = showAllSummary ? introPoints : introPoints.slice(0, 2);

  return (
    <section className="py-10 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        {/* HERO SECTION */}
        <div className="relative flex items-center justify-center min-h-[70vh] overflow-hidden rounded-2xl">
          {/* الخلفية */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={data.title}
              className="w-full h-full object-fill"
            />
          </div>
        </div>

        {/* محتوى المشروع أسفل الصورة */}
        <section className="relative z-10 -mt-16 pb-10">
          <div className="max-w-5xl mx-auto rounded-3xl shadow-xl p-10 md:p-14 border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-8"
            >
              {/* العنوان */}
              <div className="text-xl sm:text-4xl md:text-4xl font-bold bg-gradient-to-r from-primary via-brand to-pink-500 bg-clip-text text-transparent text-center py-4">
                {data.title}
              </div>

              {/* الملخص */}
              <motion.ul
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed font-medium tracking-wide max-w-3xl space-y-4 ${
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
                      className={`w-6 h-6 text-green-500 flex-shrink-0 mt-1 ${
                        isArabic ? "ml-2" : "mr-2"
                      }`}
                    />
                    <span>{point.trim()}.</span>
                  </motion.li>
                ))}

                {/* عرض المزيد / أقل */}
                {introPoints.length > 2 && (
                  <li className="flex justify-center mt-2">
                    <div
                      onClick={() => setShowAllSummary(!showAllSummary)}
                      className="flex items-center gap-2 cursor-pointer select-none text-green-600 hover:text-green-700 font-semibold transition-all duration-300 underline-offset-4 hover:underline"
                    >
                      {isArabic && (
                        <ArrowRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            showAllSummary ? "-rotate-90" : "rotate-90"
                          }`}
                        />
                      )}

                      <span>
                        {showAllSummary
                          ? isArabic
                            ? "عرض أقل"
                            : "Show less"
                          : isArabic
                          ? "عرض المزيد"
                          : "Read more"}
                      </span>

                      {!isArabic && (
                        <ArrowRight
                          className={`w-4 h-4 transform transition-transform duration-300 ${
                            showAllSummary ? "-rotate-90" : "rotate-90"
                          }`}
                        />
                      )}
                    </div>
                  </li>
                )}
              </motion.ul>
            </motion.div>
          </div>
        </section>

        {/* Highlights Section */}
        <div className="text-center pb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">
            {isArabic ? "نظرة سريعة على المشروع" : "Project at a Glance"}
          </h2>

          {/* تقسيم العناصر إلى صفين */}
          {(() => {
            const highlights = Object.entries(data.highlights || {});
            const firstRow = highlights.slice(0, 4);
            const secondRow = highlights.slice(4);

            const renderRow = (
              rowItems: [string, string][],
              rowIndex: number
            ) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center gap-8 mb-8 last:mb-0"
              >
                {rowItems.map(([k, v], index) => {
                  const Icon = iconMap[k] || Globe;
                  const gradient = colorMap[k] || "from-gray-300 to-gray-500";

                  return (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      {/* Circle card - حجم أكبر جداً */}
                      <div
                        className={`relative flex flex-col justify-center items-center w-44 h-44 sm:w-30 sm:h-30 md:w-30 md:h-30 rounded-full bg-gradient-to-br ${gradient} text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-white/20 text-center px-6`}
                      >
                        {/* الأيقونة والاسم في نفس السطر */}
                        <div className="flex items-center justify-center gap-3 mb-3">
                          <Icon className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" />
                          <p className="text-sm sm:text-base font-bold tracking-wide leading-tight">
                            {t(`projectHighlights.${k}`)}
                          </p>
                        </div>

                        {/* الوصف */}
                        <p className="text-sm font-semibold leading-relaxed">
                          {v}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );

            return (
              <>
                {renderRow(firstRow, 1)}
                {secondRow.length > 0 && renderRow(secondRow, 2)}
              </>
            );
          })()}
        </div>

        {/* Challenge / Approach / Outcome */}
        <div className="mt-16 space-y-10 pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white"
          >
            {isArabic ? "القصة وراء المشروع" : "The Story Behind"}
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex-1 max-w-md"
            >
              <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-gray-900 p-8 rounded-3xl text-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-orange-400 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {isArabic ? "التحدي" : "Challenge"}
                  </h3>
                </div>

                <ReadMoreSection
                  content={data.challenge}
                  isArabic={isArabic}
                  color="orange"
                  icon={CheckCircle}
                />
              </div>
            </motion.div>

            {/* Approach */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-md"
            >
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-gray-900 p-8 rounded-3xl text-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-blue-400 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {isArabic ? "النهج" : "Approach"}
                  </h3>
                </div>

                <ReadMoreSection
                  content={data.approach}
                  isArabic={isArabic}
                  color="blue"
                  icon={CheckCircle}
                />
              </div>
            </motion.div>

            {/* Outcome */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 max-w-md"
            >
              <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-gray-900 p-8 rounded-3xl text-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full border-2 border-purple-400 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {isArabic ? "النتيجة" : "Outcome"}
                  </h3>
                </div>

                <ReadMoreSection
                  content={data.outcome}
                  isArabic={isArabic}
                  color="purple"
                  icon={CheckCircle}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 🔹 Technical View Section */}
        <section className="mt-20 pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10"
          >
            {isArabic
              ? "النظرة التقنية (البنية والمزايا)"
              : "Technical View (Architecture & Features)"}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* العمود الأول */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-3">
                  {isArabic ? "البنية الأساسية" : "Core Design"}
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                  <li>VeloCloud Edges (HA) at Data Center and HQ</li>
                  <li>One Edge per branch (~450 sites)</li>
                  <li>Tiered access with Platinum/Gold/Silver models</li>
                  <li>Centralized Orchestrator for zero-touch provisioning</li>
                  <li>Cloud Gateways for optimized SaaS access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-3">
                  {isArabic ? "الخصائص الأساسية" : "Key Capabilities"}
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                  <li>High Availability with dual devices and auto failover</li>
                  <li>Dynamic Multi-Path Optimization (DMPO)</li>
                  <li>Application-aware routing & QoS</li>
                  <li>Segmentation for PCI/PHI compliance</li>
                  <li>Integrated security and real-time telemetry</li>
                </ul>
              </div>
            </div>

            {/* العمود الثاني */}
            <div className="flex justify-center">
              <img
                src={elezaby}
                alt="Network Architecture"
                className="rounded-2xl shadow-xl border border-white/10 max-h-[500px] object-fill"
              />
            </div>
          </div>
        </section>

        {/* 🔹 Rollout Method Section */}
        <section className="mt-24 pb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
            {isArabic ? "طريقة التنفيذ (3 شهور)" : "Rollout Method (3 Months)"}
          </h2>

          {/* خطوات التنفيذ */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { step: "Design", color: "#00C1D4" },
              { step: "Pilot", color: "#DF1783" },
              { step: "Wave 1–N", color: "#F59E0B" },
              { step: "Acceptance", color: "#10B981" },
              { step: "Handover", color: "orange" },
              { step: "Managed Ops", color: "#EC4899" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                {/* الدائرة */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-brand flex items-center justify-center font-bold text-lg shadow-lg mb-3">
                  <span style={{ color: item.color }}>{index + 1}</span>
                </div>

                {/* الكلمة أسفل الدائرة */}
                <p
                  className="font-semibold text-lg"
                  style={{ color: item.color }}
                >
                  {item.step}
                </p>
              </motion.div>
            ))}
          </div>

          {/* التفاصيل */}
          <ul className="mt-10 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 list-disc list-inside max-w-3xl mx-auto">
            <li>Wave-based deployment across governorates.</li>
            <li>Pilot phase (10–15 sites) before mass rollout.</li>
            <li>Standardized configuration templates per site.</li>
            <li>Acceptance tests for app reachability & QoS validation.</li>
          </ul>
        </section>

        {/* 🔹 Managed Service Section */}
        <section className="mt-24 text-center pb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
            {isArabic ? "الخدمة المدارة" : "Managed Service"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: Headphones, text: "24×7 Monitoring", color: "#3B82F6" }, // Blue
              {
                icon: Clock,
                text: "SLA Targets (P1 ≤15min, P2 ≤1hr)",
                color: "#F59E0B",
              }, // Amber
              {
                icon: Globe,
                text: "Monthly Reports & Reviews",
                color: "#10B981",
              }, // Green
              { icon: Cpu, text: "Change Management", color: "#6366F1" }, // Indigo
              {
                icon: Network,
                text: "Capacity & Growth Planning",
                color: "#EC4899",
              }, // Pink
              {
                icon: Building2,
                text: "Dedicated Account Manager",
                color: "#00B5D8",
              }, // Cyan
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-primary/10 to-brand/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Icon
                    className="w-10 h-10 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: item.color }}
                  />
                  <p
                    className="text-gray-700 dark:text-gray-200 font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 🔹 Testimonial Section - Responsive Fixed Version */}
        <section className="mt-24 max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Background Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4 mb-8">
                {/* Logo + Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                  <img
                    src={elezabylogo}
                    alt="El Ezaby"
                    className="w-20 h-20 object-fill rounded-full"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
                      El Ezaby Pharmacies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      450+ Branches Nationwide
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    5.0 Rating
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="relative mt-2">
                <div className="absolute -top-4 -left-2 sm:-left-4 text-primary/20 dark:text-brand/20">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>

                <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium pl-6 sm:pl-10 mt-4 sm:mt-0">
                  {data.testimonial}
                </blockquote>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Business Impact Section */}
        <section className="mt-20 pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            {isArabic ? "الأثر التجاري" : "Business Impact"}
          </motion.h2>

          <div
            className={`grid md:grid-cols-2 gap-12 items-center ${
              isArabic ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* النص */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`space-y-5 ${isArabic ? "text-right" : "text-left"}`}
              style={{ direction: isArabic ? "rtl" : "ltr" }}
            >
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {isArabic ? "القيمة والأثر" : "Value & Impact"}
              </h3>
              <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-200">
                {[
                  isArabic
                    ? "توفر واستمرارية أعلى"
                    : "Higher uptime & continuity",
                  isArabic
                    ? "تجربة تطبيقات متناسقة"
                    : "Consistent application experience",
                  isArabic ? "إطلاق أسرع للفروع" : "Faster branch launches",
                  isArabic ? "تحسين التكاليف" : "Cost optimization",
                  isArabic
                    ? "دعم الأمان والامتثال"
                    : "Security & compliance support",
                  isArabic ? "رؤية قابلة للتنفيذ" : "Actionable visibility",
                  isArabic ? "عمليات مضمونة" : "Assured operations",
                ].map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle
                      className={`w-6 h-6 text-green-500 flex-shrink-0 mt-1 ${
                        isArabic ? "ml-2" : "mr-2"
                      }`}
                    />
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* الصور */}
            <motion.div
              initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <img
                src={project_1}
                alt="Business Impact Image 1"
                className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
              <img
                src={project_2}
                alt="Business Impact Image 2"
                className="w-full h-64 object-cover rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50 dark:bg-gray-700 rounded-3xl">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isArabic
                  ? "مستعد لبدء مشروعك القادم؟"
                  : "Ready to Start Your Next Project?"}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {isArabic
                  ? "لنحول أفكارك إلى واقع ملموس"
                  : "Let's turn your ideas into reality"}
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
                className="bg-[#DF1783] text-white text-lg px-10 py-5 rounded-full hover:scale-105 hover:shadow-2xl hover:bg-pink-500 transition-all duration-300"
              >
                {isArabic ? "تحدث مع خبرائنا" : "Talk to our experts"}
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
