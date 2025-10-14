// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from "react";
// import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useTranslation } from "react-i18next";

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// };

// type FavoritesContextType = {
//   favorites: Product[];
//   addToFavorites: (product: Product) => void;
//   removeFromFavorites: (id: number) => void;
//   clearFavorites: () => void;
//   isFavorite: (id: number) => boolean;
// };

// const FavoritesContext = createContext<FavoritesContextType | undefined>(
//   undefined
// );

// export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
//   const { isAuthenticated, user } = useAuth();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // 🔑 مفتاح التخزين حسب المستخدم أو guest
//   const storageKey =
//     isAuthenticated && user ? `favorites_${user.id}` : "favorites_guest";

//   const [favorites, setFavorites] = useState<Product[]>([]);

//   // ✅ تحميل المفضلة عند أول مرة
//   useEffect(() => {
//     const saved = localStorage.getItem(storageKey);
//     if (saved) {
//       setFavorites(JSON.parse(saved));
//     }
//   }, [storageKey]);

//   // ✅ حفظ المفضلة في localStorage عند أي تعديل
//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(favorites));
//   }, [favorites, storageKey]);

//   // ❤️ إضافة إلى المفضلة
//   const addToFavorites = (product: Product) => {
//     if (!isAuthenticated) {
//       toast.warning(t("favorites.loginRequired"), {
//         action: {
//           label: t("auth.login"),
//           onClick: () => navigate("/login"),
//         },
//       });
//       return;
//     }

//     setFavorites((prev) => {
//       const exists = prev.find((item) => item.id === product.id);
//       if (exists) {
//         toast.info(t("favorites.removeFromFavorites"));
//         return prev.filter((item) => item.id !== product.id);
//       }
//       toast.success(t("favorites.addedSuccess", { product: product.name }));
//       return [...prev, product];
//     });
//   };

//   // ❌ إزالة من المفضلة
//   const removeFromFavorites = (id: number) => {
//     const removed = favorites.find((item) => item.id === id);
//     setFavorites((prev) => prev.filter((item) => item.id !== id));
//     if (removed) {
//       toast.info(t("favorites.removedSuccess", { product: removed.name }));
//     }
//   };

//   // 🚮 مسح كل المفضلة
//   const clearFavorites = () => {
//     setFavorites([]);
//     toast.info(t("favorites.clearAll"));
//   };

//   // 🔍 هل المنتج موجود في المفضلة؟
//   const isFavorite = (id: number) => favorites.some((item) => item.id === id);

//   return (
//     <FavoritesContext.Provider
//       value={{
//         favorites,
//         addToFavorites,
//         removeFromFavorites,
//         clearFavorites,
//         isFavorite,
//       }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => {
//   const context = useContext(FavoritesContext);
//   if (!context)
//     throw new Error("useFavorites must be used within FavoritesProvider");
//   return context;
// };
