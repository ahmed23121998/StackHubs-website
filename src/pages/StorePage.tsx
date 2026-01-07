// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useFavorites } from "../contexts/FavoritesContext";
// import { ShoppingCart, Box, Heart } from "lucide-react";
// import { fetchProducts, Product } from "../mockProductsApi";
// import { useTranslation } from "react-i18next";

// const StorePage: React.FC = () => {
//   const navigate = useNavigate();
//   const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
//   const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
//     useFavorites();
//   const { t } = useTranslation();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProducts().then((data) => {
//       setProducts(data);
//       setLoading(false);
//     });
//   }, []);

//   const handleAddToCart = (product: Product) => addToCart(product);

//   const handleToggleFavorite = (product: Product) => {
//     if (isFavorite(product.id)) {
//       removeFromFavorites(product.id);
//     } else {
//       addToFavorites(product);
//     }
//   };

//   const goToCheckout = () => {
//     const totalPrice = cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     navigate("/checkout", { state: { cart, totalPrice } });
//   };

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* شريط الأزرار */}
//         <div className="flex justify-between items-center mb-10">
//           <div className="flex gap-3">
//             <Button
//               variant="outline"
//               className="text-primary border-primary hover:bg-primary/10 rounded-full px-5 py-2 flex items-center gap-2 transition-all duration-300"
//               onClick={() => navigate("/orders")}
//             >
//               <Box className="w-5 h-5" />
//               {t("nav.order")}
//             </Button>
//             <Button
//               variant="outline"
//               className="text-pink-600 border-pink-500 hover:bg-pink-50 dark:hover:bg-gray-800 rounded-full px-5 py-2 flex items-center gap-2 transition-all duration-300"
//               onClick={() => navigate("/favorites")}
//             >
//               <Heart className="w-5 h-5" />
//               {t("store.favorites")} ({favorites.length})
//             </Button>
//           </div>

//           <Button
//             onClick={goToCheckout}
//             className="relative flex items-center bg-gradient-to-r from-primary to-brand text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//           >
//             <ShoppingCart className="w-6 h-6" />
//             {totalItems > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
//                 {totalItems}
//               </span>
//             )}
//           </Button>
//         </div>

//         {/* شبكة المنتجات */}
//         {loading ? (
//           <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//             {t("common.loading")}
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"
//           >
//             {products.map((product) => (
//               <motion.div
//                 key={product.id}
//                 whileHover={{ y: -8 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 <Card className="overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
//                   <div className="relative">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-52 object-cover rounded-t-3xl"
//                     />
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleToggleFavorite(product)}
//                       className={`absolute top-3 right-3 p-2 rounded-full bg-white/70 dark:bg-primary/10 backdrop-blur-md shadow-md transition-all ${
//                         isFavorite(product.id)
//                           ? "text-red-500"
//                           : "text-gray-500 hover:text-red-500"
//                       }`}
//                     >
//                       <Heart
//                         className={`h-5 w-5 ${
//                           isFavorite(product.id) ? "fill-current" : ""
//                         }`}
//                       />
//                     </Button>
//                   </div>
//                   <CardHeader className="pb-0">
//                     <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
//                       {product.name}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col items-center mt-3">
//                     <p className="text-xl font-bold text-primary dark:text-brand mb-4">
//                       {product.price} {t("common.currency")}
//                     </p>
//                     <Button
//                       onClick={() => handleAddToCart(product)}
//                       className="bg-gradient-to-r from-primary to-brand text-white px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all"
//                     >
//                       {t("cart.add")}
//                     </Button>

//                     {(() => {
//                       const cartItem = cart.find(
//                         (item) => item.id === product.id
//                       );
//                       if (cartItem) {
//                         return (
//                           <div className="flex items-center gap-3 mt-4">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="border-primary text-primary hover:bg-primary/10"
//                               onClick={() => decreaseQuantity(product.id)}
//                             >
//                               -
//                             </Button>
//                             <span className="font-semibold text-gray-900 dark:text-gray-100">
//                               {cartItem.quantity}
//                             </span>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="border-primary text-primary hover:bg-primary/10"
//                               onClick={() => increaseQuantity(product.id)}
//                             >
//                               +
//                             </Button>
//                           </div>
//                         );
//                       }
//                       return null;
//                     })()}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StorePage;
