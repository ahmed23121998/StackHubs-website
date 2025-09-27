import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFavorites } from "../contexts/FavoritesContext";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          {t("favorites.title")}
        </h1>
        {favorites.length > 0 && (
          <Button
            variant="outline"
            onClick={clearFavorites}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {t("favorites.clearAll")}
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg mb-4">{t("favorites.empty")}</p>
          <Button className="mt-4" onClick={() => navigate("/store")}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t("favorites.startShopping")}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((item) => (
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
                  <p className="text-gray-600">
                    {t("checkout.total")}: {item.price} {t("common.currency")}
                  </p>
                </CardContent>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold">
                    {item.price} {t("common.currency")}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {t("favorites.addToCart")}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromFavorites(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <span className="text-lg font-bold">
              {t("favorites.productCount")}: {favorites.length}
            </span>
            <Button
              onClick={() => navigate("/store")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t("favorites.continueShopping")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
