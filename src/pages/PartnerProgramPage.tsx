import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Target, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerProgramPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const partnerBenefits = [
    {
      icon: Handshake,
      title: t("partner.benefits.strategicPartnerships.title"),
      description: t("partner.benefits.strategicPartnerships.description"),
      color: "#3B82F6",
    },
    {
      icon: Target,
      title: t("partner.benefits.marketExpansion.title"),
      description: t("partner.benefits.marketExpansion.description"),
      color: "#10B981",
    },
    {
      icon: TrendingUp,
      title: t("partner.benefits.revenueGrowth.title"),
      description: t("partner.benefits.revenueGrowth.description"),
      color: "#F59E0B",
    },
    {
      icon: Award,
      title: t("partner.benefits.certificationTraining.title"),
      description: t("partner.benefits.certificationTraining.description"),
      color: "#8B5CF6",
    },
  ];

  const partnerTypes = [
    {
      title: t("partner.types.technologyPartners.title"),
      description: t("partner.types.technologyPartners.description"),
      benefits: t("partner.types.technologyPartners.benefits", {
        returnObjects: true,
      }) as string[],
    },
    {
      title: t("partner.types.solutionPartners.title"),
      description: t("partner.types.solutionPartners.description"),
      benefits: t("partner.types.solutionPartners.benefits", {
        returnObjects: true,
      }) as string[],
    },
    {
      title: t("partner.types.channelPartners.title"),
      description: t("partner.types.channelPartners.description"),
      benefits: t("partner.types.channelPartners.benefits", {
        returnObjects: true,
      }) as string[],
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
            {t("partner.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t("partner.subtitle")}
          </motion.p>
        </div>

        {/* Partner Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnerBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 text-center">
                  <CardHeader>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-4"
                      style={{ backgroundColor: benefit.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Types */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground mb-4"
          >
            {t("partner.types.partnerRankBenefits.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("partner.types.partnerRankBenefits.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{partner.title}</CardTitle>
                  <CardDescription>{partner.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {partner.benefits.map(
                      (benefit: string, benefitIndex: number) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">
                            {benefit}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-primary text-white rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-4">{t("partner.ctaTitle")}</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {t("partner.ctaDescription")}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg bg-gradient-to-r from-primary to-brand text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/contact")}
          >
            {t("partner.ctaButton")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerProgramPage;
