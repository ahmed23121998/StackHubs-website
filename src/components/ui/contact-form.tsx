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
      toast.error(t("contact.form.requiredFields")); // استخدم الترجمة
      return;
    }

    setIsLoading(true);

    // محاكاة إرسال البيانات
    setTimeout(() => {
      toast.success(t("contact.form.success")); // استخدم الترجمة
      setIsLoading(false);
      form.reset();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit} className="m-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium mb-2 block"
                >
                  {t("contact.form.name")}
                </label>
                <Input id="name" name="name" type="text" required />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium mb-2 block"
                >
                  {t("contact.form.email")}
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium mb-2 block"
                >
                  {t("contact.form.phone")}
                </label>
                <Input id="phone" name="phone" type="tel" />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="text-sm font-medium mb-2 block"
                >
                  {t("contact.form.company")}
                </label>
                <Input id="company" name="company" type="text" />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium mb-2 block"
              >
                {t("contact.form.message")}
              </label>
              <Textarea id="message" name="message" rows={5} required />
            </div>

            <Button
              type="submit"
              className="text-lg px-10 py-5 bg-gradient-to-r from-primary to-brand text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "جاري الإرسال..." : t("contact.form.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
