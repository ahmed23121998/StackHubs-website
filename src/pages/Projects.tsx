import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import elazaby from "@/assets/images/elazaby.jpg";
import ghazala from "@/assets/images/ghazala.jpg";
import habib from "@/assets/images/habib.jpg";
const projects = [
  {
    id: 1,
    key: "elEzabyProject",
    image: elazaby,
  },
  {
    id: 2,
    key: "ghazalaProject",
    image: ghazala,
  },
  {
    id: 3,
    key: "habibProject",
    image: habib,
  }
];

export default function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleProjectClick = (key: string) => {
    navigate(`/projects/${key}`);
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
              onClick={() => handleProjectClick(project.key)}
            >
              <img
                src={project.image}
                alt={t(`projects.${project.key}.title`)}
                className="w-full h-56 object-fill"
              />
              <div className="p-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {t(`projectDetails.${project.key}.tag`)}
                </p>
                <h3 className="text-lg font-semibold">
                  {t(`projectDetails.${project.key}.title`)} 
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {t(`projectDetails.${project.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
