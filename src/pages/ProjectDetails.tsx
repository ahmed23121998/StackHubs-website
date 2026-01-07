import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import elezaby from "@/assets/images/elazaby.jpg";
import ghazala from "@/assets/images/ghazala.jpg";
import habib from "@/assets/images/habib.jpg";
import elezabylogo from "@/assets/images/elazaby logo.jpg";
import ghazalalogo from "@/assets/images/ghazalaicon.png";
import habibicon from "@/assets/images/habibicon.png";
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

const projectMap: Record<
  string,
  { image: string; technicalImage?: string; key: string }
> = {
  elEzabyProject: {
    image: elezaby,
    technicalImage: elezabylogo,
    key: "elEzabyProject",
  },
  ghazalaProject: {
    image: ghazala,
    technicalImage: ghazalalogo,
    key: "ghazalaProject",
  },
  habibProject: {
    image: habib,
    technicalImage: habibicon,
    key: "habibProject",
  },
};

interface Testimonial {
  companyName: string;
  branches?: string;
  rating: string;
  quote: string;
}

interface TechnicalView {
  title: string;
  coreDesign: string;
  coreDesignPoints: Record<string, string>;
  keyCapabilities?: string;
  keyCapabilitiesPoints?: Record<string, string>;
  rfOptimization?: {
    title: string;
    points: Record<string, string>;
  };
  management?: {
    title: string;
    points: Record<string, string>;
  };
  UserExperience?: {
    title: string;
    points: Record<string, string>;
  };
}

interface RolloutMethod {
  title: string;
  steps: Record<string, string>;
  details: Record<string, string>;
}

interface ManagedService {
  title: string;
  features: Record<string, string>;
}

interface BusinessImpact {
  title: string;
  businessOutcomes?: {
    title: string;
    points: Record<string, string>;
  };
  keyMetrics?: {
    title: string;
    points: Record<string, string>;
  };
  points?: Record<string, string>;
}

interface ProjectDetail {
  title: string;
  summary: string;
  hero: string;
  challenge: string;
  approach: string;
  outcome: string;
  highlights?: Record<string, string>;
  projectHighlights?: Record<string, string>;
  technicalView?: TechnicalView;
  rolloutMethod?: RolloutMethod;
  managedService?: ManagedService;
  businessImpact?: BusinessImpact;
  testimonial: Testimonial;
}
export default function ProjectDetails() {
  const [showAllSections, setShowAllSections] = useState(false);
  const ReadMoreSection = ({
    content,
    isArabic,
    color = "blue",
    icon: Icon,
    showAll,
    onToggle,
  }: {
    content: string;
    isArabic: boolean;
    color?: string;
    icon: React.ElementType;
    showAll: boolean;
    onToggle: () => void;
  }) => {
    const points = content
      .split(".")
      .filter((point) => point.trim().length > 0);
    const visiblePoints = showAll ? points : points.slice(0, 1);
    const hasMore = points.length > 1;
    const { t } = useTranslation();

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
              <Icon
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

        {/* زر Read More - مشترك لجميع البوكسات */}
        {hasMore && (
          <div className={`mt-4 pt-4 border-t ${currentColor.border}/30`}>
            <div
              onClick={onToggle}
              className={`flex items-center gap-2 cursor-pointer select-none ${
                currentColor.text
              } hover:text-white font-semibold transition-all duration-300 justify-center ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
              <span>
                {showAll ? t("common.showLess") : t("common.readMore")}
              </span>
              <ArrowRight
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  showAll
                    ? isArabic
                      ? "rotate-90"
                      : "-rotate-90"
                    : isArabic
                    ? "-rotate-90"
                    : "rotate-90"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  const { key } = useParams<{ key: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const project = projectMap[key ?? ""];
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
            {t("common.projectNotFound")}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto mb-6">
            {t("common.projectNotFoundDesc")}
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-brand text-white rounded-full px-8 py-4 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            onClick={() => navigate("/projects")}
          >
            {t("common.backToProjects")}
          </Button>
        </motion.div>
      </section>
    );
  }

  const data = t(`projectDetails.${project.key}`, {
    returnObjects: true,
  }) as unknown as ProjectDetail;

  const iconMap: Record<string, React.ElementType> = {
    industry: Building2,
    scope: MapPin,
    technology: Cpu,
    availability: Network,
    connectivity: Globe,
    timeline: Clock,
    service: Headphones,
    Location: MapPin,
    "Services delivered": Globe,
    "Support model": Headphones,
    "service model": Headphones,
    "connectivity tiers": Globe,
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
          <div className="max-w-6xl mx-auto rounded-3xl shadow-xl p-10 md:p-14 border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="text-xl sm:text-4xl md:text-4xl font-bold bg-gradient-to-r from-primary via-brand to-pink-500 bg-clip-text text-transparent text-center py-4">
                {data.title}
              </div>

              <motion.ul
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`text-xl font-semibold text-gray-700 dark:text-gray-200 tracking-wide max-w-3xl space-y-4 ${
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
                          ? t("common.showLess")
                          : t("common.readMore")}
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
            {data.highlights?.title || "Project Highlights"}
          </h2>

          {(() => {
            const highlights = Object.entries(data.highlights || {});
            const filteredHighlights = highlights.filter(
              ([k]) => k !== "title"
            );
            const firstRow = filteredHighlights.slice(0, 4);
            const secondRow = filteredHighlights.slice(4);

            const colorGradients = [
              "from-blue-500 to-purple-600",
              "from-green-500 to-teal-600",
              "from-orange-500 to-red-600",
              "from-purple-500 to-pink-600",
              "from-teal-500 to-cyan-600",
              "from-rose-500 to-pink-600",
              "from-indigo-500 to-blue-600",
              "from-amber-500 to-orange-600",
            ];

            const textColors = [
              "text-blue-100",
              "text-green-100",
              "text-orange-100",
              "text-purple-100",
              "text-teal-100",
              "text-rose-100",
              "text-indigo-100",
              "text-amber-100",
            ];

            const renderRow = (
              rowItems: [string, string][],
              rowIndex: number
            ) => (
              <div
                key={rowIndex}
                className="flex flex-wrap justify-center gap-6 mb-8 last:mb-0"
              >
                {rowItems.map(([k], index) => {
                  const Icon = iconMap[k] || Globe;
                  const colorIndex =
                    (rowIndex * 4 + index) % colorGradients.length;
                  const gradient = colorGradients[colorIndex];
                  const textColor = textColors[colorIndex];

                  return (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                      }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div
                        className={`relative flex flex-col justify-center items-center w-48 h-48 rounded-full bg-gradient-to-br ${gradient} ${textColor} shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-500 border-2 border-white/30 text-center pb-4 pr-2 pl-2 backdrop-blur-sm`}
                      >
                        <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-10 h-10 opacity-90" />
                        </div>

                        <p className="text-sm font-bold tracking-wide leading-tight mb-2 opacity-95">
                          {data.projectHighlights?.[k] || k}
                        </p>

                        <p className="text-xs font-medium leading-snug opacity-90 line-clamp-3">
                          {data.highlights?.[k]}
                        </p>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}
                      ></div>
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
            {t("projectDetails.project_story", "Project Story")}
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch">
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
                    {t("projectDetails.challenge", "Challenge")}
                  </h3>
                </div>

                <ReadMoreSection
                  content={data.challenge}
                  isArabic={isArabic}
                  color="orange"
                  icon={CheckCircle}
                  showAll={showAllSections}
                  onToggle={() => setShowAllSections(!showAllSections)}
                />
              </div>
            </motion.div>

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
                    {t("projectDetails.approach", "Approach")}
                  </h3>
                </div>

                <ReadMoreSection
                  content={data.approach}
                  isArabic={isArabic}
                  color="blue"
                  icon={CheckCircle}
                  showAll={showAllSections}
                  onToggle={() => setShowAllSections(!showAllSections)}
                />
              </div>
            </motion.div>

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
                    {t("projectDetails.outcome", "Outcome")}
                  </h3>
                </div>

                <ReadMoreSection
                  content={data.outcome}
                  isArabic={isArabic}
                  color="purple"
                  icon={CheckCircle}
                  showAll={showAllSections}
                  onToggle={() => setShowAllSections(!showAllSections)}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 🔹 Technical View Section */}
        {data.technicalView && (
          <section className="mt-20 pb-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10"
            >
              {data.technicalView.title || ""}
            </motion.h2>

            {(() => {
              const isHabib = project.key === "habibProject";

              const renderList = (
                title: string | undefined,
                points?: Record<string, string> | undefined
              ) =>
                title && points ? (
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-3">
                      {title}
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                      {Object.values(points ?? {}).map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ) : null;

              return isHabib ? (
                // ✅ Layout خاص بمشروع Habib
                <div className="space-y-10">
                  {/* الصف الأول: Core Design والصورة */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* العمود الأيسر - Core Design */}
                    <motion.article
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {renderList(
                        data.technicalView.coreDesign || "",
                        data.technicalView.coreDesignPoints
                      )}
                    </motion.article>

                    {/* العمود الأيمن - الصورة */}
                    <motion.article
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={project.image}
                        alt="Technical Architecture"
                        className="rounded-xl w-full h-[300px] object-fill shadow-lg"
                      />
                    </motion.article>
                  </div>

                  {/* الصف الثاني: Key Security Features مقابل User Experience */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* العمود الأيسر - Key Security Features */}
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      {renderList(
                        data.technicalView.keyCapabilities || "",
                        data.technicalView.keyCapabilitiesPoints
                      )}
                    </motion.article>

                    {/* العمود الأيمن - User Experience */}
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {renderList(
                        data.technicalView.UserExperience?.title || "",
                        data.technicalView.UserExperience?.points
                      )}
                    </motion.article>
                  </div>

                  {/* الصف الثالث: الأقسام الإضافية */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {renderList(
                      data.technicalView.rfOptimization?.title || "",
                      data.technicalView.rfOptimization?.points
                    )}
                    {renderList(
                      data.technicalView.management?.title || "",
                      data.technicalView.management?.points
                    )}
                  </div>
                </div>
              ) : (
                // 💡 باقي المشاريع (نفس الكود القديم)
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                      {renderList(
                        data.technicalView.coreDesign || "",
                        data.technicalView.coreDesignPoints
                      )}

                      {data.technicalView.keyCapabilities &&
                        data.technicalView.keyCapabilitiesPoints && (
                          <div>
                            <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-3">
                              {data.technicalView.keyCapabilities || ""}
                            </h3>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                              {Object.values(
                                data.technicalView.keyCapabilitiesPoints ?? {}
                              )
                                .slice(0, 4)
                                .map((point, index) => (
                                  <li key={index}>{point}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    <div className="space-y-8">
                      <div className="flex justify-center items-center">
                        <img
                          src={project.image}
                          alt="Technical Architecture"
                          className="rounded-xl w-full h-[300px] object-fill"
                        />
                      </div>

                      {data.technicalView.keyCapabilities &&
                        data.technicalView.keyCapabilitiesPoints && (
                          <div className="mt-4">
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                              {Object.values(
                                data.technicalView.keyCapabilitiesPoints ?? {}
                              )
                                .slice(4)
                                .map((point, index) => (
                                  <li key={index + 4}>{point}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
                    {renderList(
                      data.technicalView.rfOptimization?.title || "",
                      data.technicalView.rfOptimization?.points
                    )}
                    {renderList(
                      data.technicalView.management?.title || "",
                      data.technicalView.management?.points
                    )}
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* 🔹 Rollout Method Section */}
        {data.rolloutMethod && (
          <section className="mt-24 pb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
              {data.rolloutMethod.title}
            </h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {Object.values(data.rolloutMethod.steps).map((step, index) => {
                const stepColors = [
                  {
                    bg: "from-blue-500 to-blue-600",
                    text: "text-blue-600 dark:text-blue-400",
                  },
                  {
                    bg: "from-green-500 to-green-600",
                    text: "text-green-600 dark:text-green-400",
                  },
                  {
                    bg: "from-purple-500 to-purple-600",
                    text: "text-purple-600 dark:text-purple-400",
                  },
                  {
                    bg: "from-orange-500 to-orange-600",
                    text: "text-orange-600 dark:text-orange-400",
                  },
                  {
                    bg: "from-pink-500 to-pink-600",
                    text: "text-pink-600 dark:text-pink-400",
                  },
                  {
                    bg: "from-teal-500 to-teal-600",
                    text: "text-teal-600 dark:text-teal-400",
                  },
                ];

                const color = stepColors[index % stepColors.length];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center font-bold text-lg text-white shadow-lg mb-3`}
                    >
                      {index + 1}
                    </div>
                    <p className={`font-semibold text-lg ${color.text}`}>
                      {step}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <ul className="mt-10 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 list-disc list-inside max-w-4xl mx-auto">
              {Object.values(data.rolloutMethod.details).map(
                (detail, index) => (
                  <li key={index}>{detail}</li>
                )
              )}
            </ul>
          </section>
        )}

        {/* 🔹 Managed Service Section */}
        {data.managedService && (
          <section className="mt-24 text-center pb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
              {data.managedService.title}
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {Object.entries(data.managedService.features).map(
                ([key, value], index) => {
                  const iconMap: Record<string, React.ElementType> = {
                    monitoring: Headphones,
                    sla: Clock,
                    reports: Globe,
                    change: Cpu,
                    capacity: Network,
                    accountManager: Building2,
                  };

                  const colorMap: Record<string, string> = {
                    monitoring: "#3B82F6",
                    sla: "#F59E0B",
                    reports: "#10B981",
                    change: "#6366F1",
                    capacity: "#EC4899",
                    accountManager: "#00B5D8",
                  };

                  const Icon = iconMap[key] || Globe;
                  const color = colorMap[key] || "#3B82F6";

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] bg-gradient-to-br from-primary/10 to-brand/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <Icon
                        className="w-10 h-10 mx-auto mb-3 transition-transform duration-300 hover:scale-110"
                        style={{ color }}
                      />
                      <p
                        className="text-gray-700 dark:text-gray-200 font-semibold"
                        style={{ color }}
                      >
                        {value}
                      </p>
                    </motion.div>
                  );
                }
              )}
            </div>
          </section>
        )}

        {/* Business Impact Section */}
        {data.businessImpact && (
          <section className="mt-20 pb-10">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
            >
              {data.businessImpact.title}
            </motion.h2>

            <div
              className={`grid md:grid-cols-2 gap-12 items-center ${
                isArabic ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`space-y-8 ${isArabic ? "text-right" : "text-left"}`}
                style={{ direction: isArabic ? "rtl" : "ltr" }}
              >
                {/* Business Outcomes */}
                {data.businessImpact.businessOutcomes && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {data.businessImpact.businessOutcomes.title}
                    </h4>
                    <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-200">
                      {Object.values(
                        data.businessImpact.businessOutcomes.points
                      ).map((point, index) => (
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
                  </div>
                )}

                {/* Key Metrics */}
                {data.businessImpact.keyMetrics && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {data.businessImpact.keyMetrics.title}
                    </h4>
                    <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-200">
                      {Object.values(data.businessImpact.keyMetrics.points).map(
                        (point, index) => (
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
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* النقاط الأساسية */}
                {data.businessImpact.points && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      Key Benefits
                    </h4>
                    <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-200">
                      {Object.values(data.businessImpact.points).map(
                        (point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle
                              className={`w-6 h-6 text-blue-500 flex-shrink-0 mt-1 ${
                                isArabic ? "ml-2" : "mr-2"
                              }`}
                            />
                            <span>{point}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-center items-center">
                <img
                  src={project.image}
                  alt="Business Impact"
                  className="rounded-xl w-full h-[300px] object-fill"
                />
              </div>
            </div>
          </section>
        )}

        {/* 🔹 Testimonial Section */}
        <section className="mt-24 max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4 mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
                  <img
                    src={project.technicalImage}
                    alt={data.testimonial.companyName}
                    className="w-20 h-20 object-fill rounded-full"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
                      {data.testimonial.companyName}
                    </h3>
                    {data.testimonial.branches && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {data.testimonial.branches}
                      </p>
                    )}
                  </div>
                </div>

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
                    {data.testimonial.rating}
                  </p>
                </div>
              </div>

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
                  {data.testimonial.quote}
                </blockquote>
              </div>
            </div>
          </motion.div>
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
                {t("cta.readyToStart", "Ready to Start Your Project?")}
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {t(
                  "cta.turnIdeasToReality",
                  "Let's turn your ideas into reality"
                )}
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
                className="bg-[#DF1783] text-white text-lg px-10 py-5 rounded-full hover:scale-105 hover:shadow-2xl hover:bg-pink-500 transition-all duration-300"
              >
                {t("cta.talkToExperts", "Talk to Our Experts")}
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
