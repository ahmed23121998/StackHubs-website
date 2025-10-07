// import hero from "@/assets/images/hero.jpg";
// import hero1 from "@/assets/images/hero1.jpg";
// import hero2 from "@/assets/images/hero2.jpg";
// import hero3 from "@/assets/images/hero3.jpg";
import Ai_image from "@/assets/images/AI Hub.jpg";
import Automation_image from "@/assets/images/Automation Hub.jpg";
import ERP_image from "@/assets/images/ERP Hub.jpg";
import Infosec_image from "@/assets/images/InfoSec Hub 1.jpg";
import IoT_image from "@/assets/images/IoT Hub.jpg";
import Network_image from "@/assets/images/Network Hub 1.jpg";
import Training_image from "@/assets/images/ُTraining Hub.jpg";
import Wireless_image from "@/assets/images/Wireless Hub.jpg";
import icon_wireless from "@/assets/images/icon_automation.png";
import AI from "@/assets/images/AI.png";
import Automation from "@/assets/images/automation.png";
import ERP1 from "@/assets/images/ERP1.webp";
import Info from "@/assets/images/infosec.png";
import iot from "@/assets/images/iot.png";
import network from "@/assets/images/network.png";
import training from "@/assets/images/Training.png";

export const serviceHubs = (t: any) => [

  {
    id: "network",
    icon: network,
    image: Network_image,
    color: "#155F82",
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
    icon: Info,
    image: Infosec_image,
    color: "#155F82",
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
    id: "wireless",
    icon: icon_wireless,
    image: Wireless_image,
    color: "#155F82",
    title: t("services.wirelessHub.title"),
    subtitle: t("services.wirelessHub.subtitle"),
    services: [
      {
        name: t("services.wirelessHub.services.wirelessNetworking"),
        description: t("services.wirelessHub.descriptions.wirelessNetworking"),
      },
      {
        name: t("services.wirelessHub.services.wirelessSecurity"),
        description: t("services.wirelessHub.descriptions.wirelessSecurity"),
      },
      {
        name: t("services.wirelessHub.services.wirelessOptimization"),
        description: t(
          "services.wirelessHub.descriptions.wirelessOptimization"
        ),
      },
    ],
  },

  {
    id: "ai",
    icon: AI,
    image: Ai_image,
    color: "#155F82",
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
    id: "iot",
    icon: iot,
    image: IoT_image,
    color: "#155F82",
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
    icon: Automation,
    image: Automation_image,
    color: "#155F82",
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
    icon: ERP1,
    image: ERP_image,
    color: "#155F82",
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
    icon: training,
    image: Training_image,
    color: "#155F82",
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
