// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";
// import { Receipt, Package, ArrowLeft } from "lucide-react";

// type Order = {
//   id: number;
//   customer: {
//     name: string;
//     phone: string;
//     address: string;
//   };
//   items: { name: string; price: number }[];
//   total: number;
//   date: string;
// };

// const OrdersPage: React.FC = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
//     setOrders(savedOrders);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-20">
//       <div className="max-w-5xl mx-auto px-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
//           <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
//             <Receipt className="w-7 h-7 text-primary" />
//             {t("nav.order")}
//           </h1>
//           <Button
//             variant="outline"
//             onClick={() => navigate("/store")}
//             className="flex items-center gap-2 text-primary border-primary hover:bg-primary/10 rounded-full px-5 py-2 transition-all duration-300"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             {t("nav.store")}
//           </Button>
//         </div>

//         {/* المحتوى */}
//         {orders.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
//           >
//             <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <p className="text-lg text-gray-600 dark:text-gray-400">
//               {t("orders.empty")}
//             </p>
//             <Button
//               onClick={() => navigate("/store")}
//               className="mt-6 bg-gradient-to-r from-primary to-brand text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all"
//             >
//               {t("orders.startShopping")}
//             </Button>
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="space-y-8"
//           >
//             {orders.map((order) => (
//               <motion.div
//                 key={order.id}
//                 whileHover={{ y: -5 }}
//                 transition={{ type: "spring", stiffness: 150 }}
//                 className="border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-xl font-bold text-primary dark:text-brand">
//                     {t("orders.orderNumber", { id: order.id })} #{order.id}
//                   </h2>
//                   <span className="text-sm text-gray-500 dark:text-gray-400">
//                     {t("orders.date")}: {order.date}
//                   </span>
//                 </div>

//                 <div className="space-y-1 text-gray-700 dark:text-gray-200 mb-4">
//                   <p>
//                     <strong>{t("contact.form.name")}:</strong>{" "}
//                     {order.customer.name}
//                   </p>
//                   <p>
//                     <strong>{t("contact.form.phone")}:</strong>{" "}
//                     {order.customer.phone}
//                   </p>
//                   <p>
//                     <strong>{t("contact.form.address")}:</strong>{" "}
//                     {order.customer.address}
//                   </p>
//                 </div>

//                 <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-4">
//                   {order.items.map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="flex justify-between py-2 text-gray-800 dark:text-gray-100"
//                     >
//                       <span>{item.name}</span>
//                       <span className="font-semibold">
//                         {item.price} {t("common.currency")}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="flex justify-end">
//                   <span className="text-lg font-bold text-primary dark:text-brand">
//                     {t("checkout.total")}: {order.total} {t("common.currency")}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
