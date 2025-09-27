import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function RegisterPage() {
  const { t } = useTranslation();
  const registerSchema = z
    .object({
      name: z.string().min(2, { message: t("errors.nameMin") }),
      email: z.string().email({ message: t("errors.invalidEmail") }),
      password: z.string().min(6, { message: t("errors.passwordMin") }),
      confirmPassword: z.string(),
      accountType: z
        .enum(["individual", "organization"], {
          errorMap: () => ({ message: t("errors.accountTypeRequired") }),
        })
        .default("individual"),
      companyName: z.string().optional(),
      taxId: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.passwordMismatch"),
      path: ["confirmPassword"],
    })
    .superRefine((data, ctx) => {
      if (data.accountType === "organization") {
        if (!data.companyName || data.companyName.length < 2) {
          ctx.addIssue({
            path: ["companyName"],
            code: "custom",
            message: t("errors.companyNameRequired"),
          });
        }
        if (!data.taxId || data.taxId.length < 2) {
          ctx.addIssue({
            path: ["taxId"],
            code: "custom",
            message: t("errors.taxIdRequired"),
          });
        }
      }
    });

  type RegisterFormValues = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "individual",
      companyName: "",
      taxId: "",
    },
  });

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values: RegisterFormValues) {
    const success = await register(
      values.name,
      values.email,
      values.password,
      values.accountType,
      values.companyName,
      values.taxId
    );
    if (success) {
      toast.success(t("auth.registrationSuccess"));
      navigate("/");
    } else {
      toast.error(t("auth.registrationFailed"));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {t("auth.createAccount")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.enterName")}
                        type="text"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.enterEmail")}
                        type="email"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {t("auth.accountType")}
                </label>
                <div className="flex gap-6">
                  {/* Individual */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="individual"
                      {...form.register("accountType")}
                      className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="font-normal">{t("auth.individual")}</span>
                  </label>

                  {/* Organization */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="organization"
                      {...form.register("accountType")}
                      className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="font-normal">
                      {t("auth.organization")}
                    </span>
                  </label>
                </div>
              </div>

              {/* Conditional fields for organization */}
              {form.watch("accountType") === "organization" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("auth.companyName")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("auth.enterCompanyName")}
                            type="text"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("auth.taxId")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t("auth.enterTaxId")}
                            type="text"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold"
                disabled={loading}
              >
                {loading ? t("auth.creatingAccount") : t("auth.createAccount")}
              </Button>
            </form>
          </Form>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link
              className="underline text-blue-600 hover:text-blue-800"
              to="/login"
            >
              {t("auth.signInLink")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
