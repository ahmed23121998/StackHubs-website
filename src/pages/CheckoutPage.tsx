import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { useTranslation } from "react-i18next";

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

    if (cart.length === 0) {
      alert(t("checkout.emptyCartAlert"));
      return;
    }

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
    <div className="min-h-screen py-12 bg-muted/50 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white dark:bg-gray-900 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold dark:text-blue-200">
              {t("checkout.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold mb-2 sm:mb-0 dark:text-blue-200">
                🛒 {t("checkout.products")}
                <span className="text-blue-700 dark:text-blue-300 font-bold mx-2">
                  ({totalItems})
                </span>
              </h3>
              {cart.length > 0 && (
                <Button
                  variant="destructive"
                  className="px-4 py-2 rounded-full dark:bg-red-700 dark:hover:bg-red-800"
                  onClick={handleClearCart}
                >
                  {t("checkout.clearCart")}
                </Button>
              )}
            </div>
            {cart.length === 0 ? (
              <p className="text-muted-foreground dark:text-gray-400">
                {t("checkout.empty")}
              </p>
            ) : (
              <ul className="space-y-3 mb-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded object-cover border dark:border-gray-700"
                      />
                      <div>
                        <p className="font-medium dark:text-blue-100">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          {item.price} {t("common.currency")}{" "}
                          {t("checkout.perUnit")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-800"
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
                        className="dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-800"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="dark:bg-red-700 dark:hover:bg-red-800"
                        onClick={() => removeFromCart(item.id)}
                      >
                        {t("checkout.remove")}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center font-bold text-lg mb-6">
              <span>{t("checkout.total")}:</span>
              <span>
                {totalPrice} {t("common.currency")}
              </span>
            </div>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full px-5 py-3 shadow-sm text-base font-medium"
                onClick={() => navigate("/store")}
              >
                <span className="text-xl">🛍️</span>
                <span>{t("checkout.continueShopping")}</span>
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 shadow-md text-lg font-semibold dark:bg-green-700 dark:hover:bg-green-800"
              >
                ✅ {t("checkout.submit")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
