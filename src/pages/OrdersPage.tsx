import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type Order = {
  id: number;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: { name: string; price: number }[];
  total: number;
  date: string;
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen py-12 bg-muted/50 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold mb-2 sm:mb-0">{t("nav.order")}</h1>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-gray-800 rounded-full px-4 py-2 whitespace-nowrap"
            onClick={() => navigate("/store")}
          >
            ⬅️ {t("nav.store")}
          </Button>
        </div>

        {orders.length === 0 ? (
          <p className="text-muted-foreground">{t("orders.empty")}</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800"
              >
                <h2 className="text-xl font-bold mb-2">
                  {t("orders.orderNumber", {
                    id: order.id,
                  })}{" "}
                  {order.id}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t("orders.date")}: {order.date}
                </p>
                <p className="mt-2">
                  <strong>{t("contact.form.name")}:</strong>{" "}
                  {order.customer.name}
                </p>
                <p>
                  <strong>{t("contact.form.phone")}:</strong>{" "}
                  {order.customer.phone}
                </p>
                <p>
                  <strong>{t("contact.form.address")}:</strong>{" "}
                  {order.customer.address}
                </p>

                <ul className="mt-3 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>
                        {item.price} {t("common.currency")}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 font-bold text-lg">
                  {t("checkout.total")}: {order.total} {t("common.currency")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
