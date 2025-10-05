import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// استورد الصور
import project_7_1 from "@/assets/images/project_7_1.jpg";
import project_7_2 from "@/assets/images/project_7_2.jpg";
import project_7_3 from "@/assets/images/project_7_3.jpg";

const projects = [
  {
    id: 1,
    image: project_7_1,
    titleKey: "projects.dataAnalytics.title",
    tagKey: "projects.dataAnalytics.tag",
    descKey: "projects.dataAnalytics.desc",
  },
  {
    id: 2,
    image: project_7_2,
    titleKey: "projects.itSolution.title",
    tagKey: "projects.itSolution.tag",
    descKey: "projects.itSolution.desc",
  },
  {
    id: 3,
    image: project_7_3,
    titleKey: "projects.cloudSecurity.title",
    tagKey: "projects.cloudSecurity.tag",
    descKey: "projects.cloudSecurity.desc",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProjectClick = (id: number) => {
    navigate(`/projects/${id}`);
  };

  return (
    <section className="py-20 dark:bg-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            {t("projects.title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-700 rounded-2xl shadow-md cursor-pointer overflow-hidden"
              onClick={() => handleProjectClick(project.id)}
            >
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {t(project.tagKey)}
                </p>
                <h3 className="text-lg font-semibold">{t(project.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {t(project.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
