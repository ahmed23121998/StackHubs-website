import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/service-card";
import {
  Network,
  Shield,
  Cpu,
  Settings,
  Database,
  GraduationCap,
  Brain,
} from "lucide-react";

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  const serviceHubs = [
    {
      icon: Brain,
      title: t("services.aiHub.title"),
      subtitle: t("services.aiHub.subtitle"),
      services: [
        {
          name: t("services.aiHub.services.chatbots"),
          description: t("services.aiHub.descriptions.chatbots"),
        },
        {
          name: t("services.aiHub.services.rag"),
          description: t("services.aiHub.descriptions.rag"),
        },
        {
          name: t("services.aiHub.services.visionNlp"),
          description: t("services.aiHub.descriptions.visionNlp"),
        },
        {
          name: t("services.aiHub.services.automation"),
          description: t("services.aiHub.descriptions.automation"),
        },
      ],
      color: "#0EA5E9",
    },
    {
      icon: Network,
      title: t("services.networkHub.title"),
      subtitle: t("services.networkHub.subtitle"),
      services: [
        {
          name: t("services.networkHub.services.consultation"),
          description: t("services.networkHub.descriptions.consultation"),
        },
        {
          name: t("services.networkHub.services.managed"),
          description: t("services.networkHub.descriptions.managed"),
        },
        {
          name: t("services.networkHub.services.implementation"),
          description: t("services.networkHub.descriptions.implementation"),
        },
        {
          name: t("services.networkHub.services.auditing"),
          description: t("services.networkHub.descriptions.auditing"),
        },
        {
          name: t("services.networkHub.services.modernization"),
          description: t("services.networkHub.descriptions.modernization"),
        },
      ],
      color: "#3B82F6",
    },
    {
      icon: Shield,
      title: t("services.infosecHub.title"),
      subtitle: t("services.infosecHub.subtitle"),
      services: [
        {
          name: t("services.infosecHub.services.vulnerability"),
          description: t("services.infosecHub.descriptions.vulnerability"),
        },
        {
          name: t("services.infosecHub.services.incident"),
          description: t("services.infosecHub.descriptions.incident"),
        },
        {
          name: t("services.infosecHub.services.compliance"),
          description: t("services.infosecHub.descriptions.compliance"),
        },
        {
          name: t("services.infosecHub.services.monitoring"),
          description: t("services.infosecHub.descriptions.monitoring"),
        },
      ],
      color: "#10B981",
    },
    {
      icon: Cpu,
      title: t("services.iotHub.title"),
      subtitle: t("services.iotHub.subtitle"),
      services: [
        {
          name: t("services.iotHub.services.deviceManagement"),
          description: t("services.iotHub.descriptions.deviceManagement"),
        },
        {
          name: t("services.iotHub.services.edgeComputing"),
          description: t("services.iotHub.descriptions.edgeComputing"),
        },
        {
          name: t("services.iotHub.services.iotSecurity"),
          description: t("services.iotHub.descriptions.iotSecurity"),
        },
        {
          name: t("services.iotHub.services.predictiveMaintenance"),
          description: t("services.iotHub.descriptions.predictiveMaintenance"),
        },
      ],
      color: "#F59E0B",
    },
    {
      icon: Settings,
      title: t("services.automationHub.title"),
      subtitle: t("services.automationHub.subtitle"),
      services: [
        {
          name: t("services.automationHub.services.processAutomation"),
          description: t(
            "services.automationHub.descriptions.processAutomation"
          ),
        },
        {
          name: t("services.automationHub.services.workflowOptimization"),
          description: t(
            "services.automationHub.descriptions.workflowOptimization"
          ),
        },
        {
          name: t("services.automationHub.services.aiIntegration"),
          description: t("services.automationHub.descriptions.aiIntegration"),
        },
      ],
      color: "#EF4444",
    },
    {
      icon: Database,
      title: t("services.sapHub.title"),
      subtitle: t("services.sapHub.subtitle"),
      services: [
        {
          name: t("services.sapHub.services.implementation"),
          description: t("services.sapHub.descriptions.implementation"),
        },
        {
          name: t("services.sapHub.services.consultation"),
          description: t("services.sapHub.descriptions.consultation"),
        },
        {
          name: t("services.sapHub.services.support"),
          description: t("services.sapHub.descriptions.support"),
        },
        {
          name: t("services.sapHub.services.migration"),
          description: t("services.sapHub.descriptions.migration"),
        },
        {
          name: t("services.sapHub.services.security"),
          description: t("services.sapHub.descriptions.security"),
        },
        {
          name: t("services.sapHub.services.optimization"),
          description: t("services.sapHub.descriptions.optimization"),
        },
      ],
      color: "#84CC16",
    },
    {
      icon: GraduationCap,
      title: t("services.trainingHub.title"),
      subtitle: t("services.trainingHub.subtitle"),
      services: [
        {
          name: t("services.trainingHub.services.technicalTraining"),
          description: t("services.trainingHub.descriptions.technicalTraining"),
        },
        {
          name: t("services.trainingHub.services.certificationPrep"),
          description: t("services.trainingHub.descriptions.certificationPrep"),
        },
        {
          name: t("services.trainingHub.services.customWorkshops"),
          description: t("services.trainingHub.descriptions.customWorkshops"),
        },
      ],
      color: "#F97316",
    },
  ];

  return (
    <div className="min-h-screen py-12 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {t("services.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t("services.subtitle")}
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceHubs.map((hub, index) => (
            <ServiceCard
              key={index}
              icon={hub.icon}
              title={hub.title}
              subtitle={hub.subtitle}
              services={hub.services}
              color={hub.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
