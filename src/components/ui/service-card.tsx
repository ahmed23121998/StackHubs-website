import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  icon?: string | React.ElementType;
  image?: string;
  title: string;
  subtitle: string;
  services: { name: string; description?: string }[];
  color?: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  image,
  title,
  subtitle,
  services,
  color = "#155F82",
  index = 0,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/services/${title.replace(/\s+/g, "-")}`)}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
    >
      {/* صورة الهب */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            style={{ backgroundColor: `${color}40` }}
          />
        </div>
      )}

      <div className="p-6">
        {/* الأيقونة */}
        {icon && (
          <div className="mb-4 flex justify-center">
            {typeof icon === "string" ? (
              <img
                src={icon}
                alt={title}
                className="w-16 h-16 object-contain rounded-full shadow-md border-2 border-gray-200 dark:border-gray-700 group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              React.createElement(icon, {
                className:
                  "w-14 h-14 text-brand group-hover:scale-110 transition-transform duration-500",
              })
            )}
          </div>
        )}

        {/* العنوان والوصف */}
        <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {subtitle}
        </p>

        {/* قائمة الخدمات */}
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {services.slice(0, 4).map((service, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: color }}
              >
                ✓
              </span>
              <div>
                <strong>{service.name}</strong>
                {service.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {service.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
