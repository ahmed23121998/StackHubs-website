import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const form = e.target as HTMLFormElement;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const phone = (
      form.elements.namedItem("phone") as HTMLInputElement
    ).value.trim();
    const company = (
      form.elements.namedItem("company") as HTMLInputElement
    ).value.trim();
    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();

    // تحقق من الحقول المطلوبة
    if (!name || !email || !phone || !company || !message) {
      toast.error(t("contact.form.requiredFields"));
      return;
    }

    setIsLoading(true);
    try {
     fetch("https://store.stackhubs.com/api/auth/contactus/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, company, message }),
    })
    // محاكاة إرسال البيانات
  
    
    
      toast.success(t("contact.form.success"));
      setIsLoading(false);
      form.reset();
    
    } catch (error) {
      toast.error(t("contact.form.error"));
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Card className="w-full max-w-2xl mx-auto shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 min-h-[500px] h-full">
        <CardContent className="h-full p-6">
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300"
                >
                  {t("contact.form.name")}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300"
                >
                  {t("contact.form.email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300"
                >
                  {t("contact.form.phone")}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300"
                >
                  {t("contact.form.company")}
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="flex-1">
              <label
                htmlFor="message"
                className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-300"
              >
                {t("contact.form.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                rows={8}
                required
                className="h-full min-h-[150px] resize-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-primary focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              className="text-lg px-10 py-5 bg-gradient-to-r from-primary to-brand text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full mt-6 hover:from-primary/90 hover:to-brand/90 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? t("contact.form.sending") : t("contact.form.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
