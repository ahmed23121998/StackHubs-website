import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ShoppingCart, Box } from "lucide-react";
import { fetchProducts, Product } from "../mockProductsApi";
import { useTranslation } from "react-i18next";

const StorePage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = (product: Product) => addToCart(product);
  const goToCheckout = () => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    navigate("/checkout", { state: { cart, totalPrice } });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen py-12 bg-muted/50 pt-24 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* شريط الأزرار */}
        <div className="flex justify-between items-center mb-6 -mt-2">
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2"
            onClick={() => navigate("/orders")}
          >
            <Box className="w-5 h-5" />
            {t("nav.order")}
          </Button>
          <Button
            onClick={goToCheckout}
            className="relative flex items-center rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <ShoppingCart className="w-6 h-6 " />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
        {/* شبكة المنتجات */}
        {loading ? (
          <div className="text-center py-12">{t("common.loading")}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800"
              >
                <Card className="h-full flex flex-col bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 shadow-xl border-0 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                  <CardHeader className="pb-0">
                    <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-300">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center pt-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded-xl border border-blue-200 dark:border-gray-700 shadow-sm"
                    />
                    <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-200">
                      {product.price} {t("common.currency")}
                    </p>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="mt-auto mb-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                      {t("cart.add")}
                    </Button>
                    {(() => {
                      const cartItem = cart.find(
                        (item) => item.id === product.id
                      );
                      if (cartItem) {
                        return (
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-800"
                              onClick={() => decreaseQuantity(product.id)}
                            >
                              -
                            </Button>
                            <span className="font-bold text-blue-900 dark:text-blue-200">
                              {cartItem.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-800"
                              onClick={() => increaseQuantity(product.id)}
                            >
                              +
                            </Button>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;
