// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { useTranslation } from "react-i18next";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Eye, EyeOff } from "lucide-react";
// import React from "react";
// import logo from "../assets/images/stack logo.png";

// export default function LoginPage() {
//   const { t, i18n } = useTranslation();
//   const loginSchema = z.object({
//     email: z.string().email({ message: t("errors.invalidEmail") }),
//     password: z.string().min(6, { message: t("errors.passwordMin") }),
//   });

//   type LoginFormValues = z.infer<typeof loginSchema>;
//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: { email: "", password: "" },
//   });
//   const { login, loading } = useAuth();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState<boolean>(false);

//   async function onSubmit(values: LoginFormValues) {
//     const success = await login(values);
//     if (success) {
//       toast.success(t("auth.loginSuccess"));
//       navigate("/");
//     } else {
//       toast.error(t("auth.loginFailed"));
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">
//       <Card className="w-full max-w-md shadow-xl rounded-2xl">
//         <img
//           src={logo}
//           alt="StackHubs Logo"
//           className="h-20 w-15 mx-auto pt-2"
//           style={{ maxWidth: "160px" }}
//         />
//         <CardHeader>
//           <CardTitle className="text-center text-2xl font-bold">
//             {t("auth.login")}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//               {/* Email */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>{t("auth.email")}</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="you@example.com"
//                         type="email"
//                         className="h-11"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Password */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>{t("auth.password")}</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Input
//                           placeholder="••••••••"
//                           type={showPassword ? "text" : "password"}
//                           className={`h-11 ${
//                             i18n.dir() === "rtl" ? "pl-10" : "pr-10"
//                           }`}
//                           {...field}
//                         />
//                         <button
//                           type="button"
//                           aria-label={
//                             showPassword
//                               ? t("password.hide")
//                               : t("password.show")
//                           }
//                           className={`absolute inset-y-0 flex items-center justify-center p-3  bg-gradient-to-r from-primary to-brand text-white  shadow-md hover:shadow-lg hover:scale-105  transition-all duration-300 ${
//                             i18n.dir() === "rtl" ? "left-0" : "right-0"
//                           }`}
//                           onClick={() => setShowPassword((v) => !v)}
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-4 w-4" />
//                           ) : (
//                             <Eye className="h-4 w-4" />
//                           )}
//                         </button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <Button
//                 type="submit"
//                 className="text-lg w-full px-10 py-5 bg-gradient-to-r from-primary to-brand text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
//                 disabled={loading}
//               >
//                 {loading ? t("auth.signingIn") : t("auth.signIn")}
//               </Button>
//             </form>
//           </Form>

//           <div className="mt-5 text-center text-sm text-muted-foreground">
//             {t("auth.dontHaveAccount")}{" "}
//             <Link
//               className="underline text-blue-600 hover:text-blue-800"
//               to="/register"
//             >
//               {t("auth.createOne")}
//             </Link>
//           </div>
//           <p className="mt-2 text-xs text-muted-foreground ">
//             {t("auth.mustRegisterFirst")}
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
