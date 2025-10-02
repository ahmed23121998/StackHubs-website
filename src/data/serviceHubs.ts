import {
  Network,
  Shield,
  Cpu,
  Settings,
  Database,
  GraduationCap,
  Brain,
} from "lucide-react";

import hero from "@/assets/images/hero.jpg";
import hero1 from "@/assets/images/hero1.jpg";
import hero2 from "@/assets/images/hero2.jpg";
import hero3 from "@/assets/images/hero3.jpg";

// ✅ كل Hub فيه:
// id = slug (لاستخدامه في الـ URL)
// icon = أيقونة
// image = صورة للسلايدر
// color = لون الأيقونة
// title/subtitle = نصوص من i18n
// services = الخدمات بتاعت الهب

export const serviceHubs = (t: any) => [
  {
    id: "ai",
    icon: Brain,
    image: hero,
    color: "#0EA5E9",
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
  },
  {
    id: "network",
    icon: Network,
    image: hero1,
    color: "#3B82F6",
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
  },
  {
    id: "infosec",
    icon: Shield,
    image: hero2,
    color: "#10B981",
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
  },
  {
    id: "iot",
    icon: Cpu,
    image: hero1,
    color: "#F59E0B",
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
  },
  {
    id: "automation",
    icon: Settings,
    image: hero2,
    color: "#EF4444",
    title: t("services.automationHub.title"),
    subtitle: t("services.automationHub.subtitle"),
    services: [
      {
        name: t("services.automationHub.services.processAutomation"),
        description: t("services.automationHub.descriptions.processAutomation"),
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
  },
  {
    id: "sap",
    icon: Database,
    image: hero3,
    color: "#84CC16",
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
  },
  {
    id: "training",
    icon: GraduationCap,
    image: hero,
    color: "#F97316",
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
  },
];
