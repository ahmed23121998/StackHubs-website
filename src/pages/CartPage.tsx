import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  // حساب الإجمالي
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;

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
    alert("✅ تم إرسال الطلب بنجاح");
    navigate("/orders");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 سلة المشتريات</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>السلة فاضية حاليا</p>
          <Button className="mt-4" onClick={() => navigate("/store")}>
            ⬅️ ارجع للتسوق
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex items-center gap-4 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <CardContent className="flex-1">
                  <CardTitle>{item.name}</CardTitle>
                  <p className="text-gray-600">السعر: {item.price} جنيه</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </CardContent>
                <div className="flex flex-col items-end">
                  <p className="font-bold">{item.price * item.quantity} جنيه</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    حذف
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <span className="text-lg font-bold">
              الإجمالي: {totalPrice} جنيه
            </span>
            <Button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              ✅ إتمام الشراء
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
