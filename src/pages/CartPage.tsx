import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      customer: {
        name: t("cart.customerName"),
        phone: t("cart.phone"),
        address: t("cart.address"),
      },
      items: cart.map((item) => ({
        name: item.name,
        price: item.price * item.quantity,
      })),
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    clearCart();
    alert(t("cart.success"));
    navigate("/orders");
  };

  return (
    <div className="min-h-screen py-12 bg-muted/50 pt-24 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* عنوان الصفحة */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
            <ShoppingCart className="w-7 h-7 text-blue-600" />
            {t("cart.title")}
          </h1>

          {cart.length > 0 && (
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t("cart.clearCart")}
            </Button>
          )}
        </div>

        {/* لو السلة فاضية */}
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {t("cart.empty")}
            </p>
            <Button
              onClick={() => navigate("/store")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              {t("cart.backToStore")}
            </Button>
          </div>
        ) : (
          <>
            {/* المنتجات في السلة */}
            <div className="space-y-6">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex items-center gap-4 p-4 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border border-blue-200 dark:border-gray-700"
                    />
                    <CardContent className="flex-1">
                      <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                        {item.name}
                      </CardTitle>
                      <p className="text-blue-700 dark:text-blue-200 text-sm mt-1">
                        {t("cart.price")}: {item.price} {t("common.currency")}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </Button>
                        <span className="font-bold text-blue-900 dark:text-blue-200">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </Button>
                      </div>
                    </CardContent>
                    <div className="flex flex-col items-end justify-between h-full">
                      <p className="font-bold text-blue-900 dark:text-blue-200">
                        {item.price * item.quantity} {t("common.currency")}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="mt-2 rounded-full"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t("cart.delete")}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* الإجمالي */}
            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex justify-between items-center border border-blue-100/50 dark:border-gray-700">
              <span className="text-lg font-bold text-blue-900 dark:text-blue-200">
                {t("cart.total")}: {totalPrice} {t("common.currency")}
              </span>
              <Button
                onClick={handleCheckout}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                {t("cart.checkout")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
