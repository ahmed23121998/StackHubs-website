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
import { Badge } from "@/components/ui/badge";
import { Star, Gift, Users, Trophy } from "lucide-react";

const LoyalProgramPage: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Star,
      title: t("loyal.benefits.priority.title"),
      description: t("loyal.benefits.priority.description"),
      color: "#F59E0B",
    },
    {
      icon: Gift,
      title: t("loyal.benefits.discounts.title"),
      description: t("loyal.benefits.discounts.description"),
      color: "#10B981",
    },
    {
      icon: Users,
      title: t("loyal.benefits.accountManager.title"),
      description: t("loyal.benefits.accountManager.description"),
      color: "#3B82F6",
    },
    {
      icon: Trophy,
      title: t("loyal.benefits.earlyAccess.title"),
      description: t("loyal.benefits.earlyAccess.description"),
      color: "#8B5CF6",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            {t("nav.loyal")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t(
              "loyal.subtitle",
              "Join our loyalty program and unlock exclusive benefits designed to accelerate your IT success."
            )}
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: benefit.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </div>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Program Tiers */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-foreground mb-4"
          >
            {t("loyal.tiers.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["bronze", "silver", "gold"].map((tier, index) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                className={`h-full ${
                  tier === "gold" ? "border-yellow-500 shadow-lg" : ""
                }`}
              >
                <CardHeader className="text-center">
                  <Badge
                    variant={tier === "gold" ? "default" : "secondary"}
                    className="mx-auto mb-2"
                  >
                    {t(`loyal.tiers.${tier}.name`)}
                  </Badge>
                  <CardTitle className="text-2xl">
                    {t("loyal.tiers.member", {
                      tier: t(`loyal.tiers.${tier}.name`),
                    })}
                  </CardTitle>
                  <CardDescription>
                    {tier === "bronze" && t("loyal.tiers.bronze.description")}
                    {tier === "silver" && t("loyal.tiers.silver.description")}
                    {tier === "gold" && t("loyal.tiers.gold.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">
                        {t("loyal.tiers.features.standardSupport")}
                      </span>
                    </li>
                    {(tier === "silver" || tier === "gold") && (
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">
                          {t("loyal.tiers.features.prioritySupport")}
                        </span>
                      </li>
                    )}
                    {tier === "gold" && (
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">
                          {t("loyal.tiers.features.support247")}
                        </span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyalProgramPage;
