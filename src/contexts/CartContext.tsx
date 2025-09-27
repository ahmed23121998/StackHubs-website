import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "./AuthContext";
import { useFavorites } from "./FavoritesContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  addToFavorites: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const { addToFavorites } = useFavorites();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 🔑 مفتاح التخزين: لكل يوزر أو guest
  const storageKey = isAuthenticated && user ? `cart_${user.id}` : "cart_guest";

  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ تحميل السلة عند أول مرة
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, [storageKey]);

  // ✅ حفظ السلة في localStorage مع كل تعديل
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  // ➕ إضافة منتج للسلة
  const addToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast.warning(t("cart.loginRequired"), {
        action: { label: t("auth.login"), onClick: () => navigate("/login") },
      });
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast.success(t("cart.quantityIncreased"));
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(t("cart.addedSuccess", { product: product.name }));
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToFavorites = (product: Product) => {
    if (!isAuthenticated) {
      toast.warning(t("favorites.loginRequired"), {
        action: { label: t("auth.login"), onClick: () => navigate("/login") },
      });
      return;
    }
    addToFavorites(product);
    toast.success(t("favorites.addedSuccess", { product: product.name }));
  };

  const removeFromCart = (id: number) => {
    const removed = cart.find((item) => item.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (removed) {
      toast.info(t("cart.removedSuccess", { product: removed.name }));
    }
  };

  const clearCart = () => {
    setCart([]);
    toast.info(t("cart.clearedSuccess"));
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.success(t("cart.quantityIncreased"));
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
    toast.info(t("cart.quantityDecreased"));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        addToFavorites: handleAddToFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
