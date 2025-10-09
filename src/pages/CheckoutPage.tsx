import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { useTranslation } from "react-i18next";
import { ShoppingCart, Trash2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleClearCart = () => {
    const confirmed = window.confirm(t("checkout.clearCartConfirmation"));
    if (confirmed) {
      clearCart();
      localStorage.removeItem("cart");
      navigate("/store");
    }
  };

  const handleSubmit = () => {
    if (cart.length === 0) {
      alert(t("checkout.emptyCartAlert"));
      return;
    }

    const newOrder = {
      id: Date.now(),
      customer: {
        name: "اسم العميل",
        phone: "0123456789",
        address: "العنوان",
      },
      items: cart.map((item) => ({
        name: item.name,
        price: item.price * item.quantity,
      })),
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );
    clearCart();
    alert(t("checkout.success"));
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary to-brand text-white p-6">
            <CardTitle className="text-2xl font-bold flex items-center gap-2 justify-center">
              <ShoppingCart className="w-6 h-6" />
              {t("checkout.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                🛒 {t("checkout.products")}
                <span className="text-blue-600 dark:text-blue-300 font-bold mx-2">
                  ({totalItems})
                </span>
              </h3>

              {cart.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all duration-300 dark:text-red-400 dark:border-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t("checkout.clearCart")}
                </Button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                  {t("checkout.empty")}
                </p>
                <Button
                  onClick={() => navigate("/store")}
                  className="bg-gradient-to-r from-primary to-brand text-white rounded-full px-8 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  🛍️ {t("checkout.continueShopping")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-between items-center bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover border border-blue-100 dark:border-gray-700"
                      />
                      <div>
                        <p className="font-semibold text-blue-900 dark:text-blue-200">
                          {item.name}
                        </p>
                        <p className="text-sm text-blue-700 dark:text-gray-400">
                          {item.price} {t("common.currency")}{" "}
                          {t("checkout.perUnit")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <span className="font-bold dark:text-blue-200">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="rounded-full dark:bg-red-700 dark:hover:bg-red-800"
                        onClick={() => removeFromCart(item.id)}
                      >
                        {t("checkout.remove")}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-5 rounded-2xl shadow-inner flex justify-between items-center font-bold text-lg mb-6">
                <span className="text-blue-900 dark:text-blue-200">
                  {t("checkout.total")}:
                </span>
                <span className="text-blue-700 dark:text-blue-300">
                  {totalPrice} {t("common.currency")}
                </span>
              </div>
            )}

            {cart.length > 0 && (
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-800 rounded-full px-6 py-3 shadow-sm text-base font-medium"
                  onClick={() => navigate("/store")}
                >
                  🛍️ {t("checkout.continueShopping")}
                </Button>

                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-8 py-3 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg font-semibold"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {t("checkout.submit")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;
