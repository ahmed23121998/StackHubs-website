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
    <div className="min-h-screen bg-muted/50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500" />
            {t("favorites.title")}
          </h1>

          {favorites.length > 0 && (
            <Button
              variant="outline"
              onClick={clearFavorites}
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t("favorites.clearAll")}
            </Button>
          )}
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {t("favorites.empty")}
            </p>
            <Button
              onClick={() => navigate("/store")}
              className="bg-gradient-to-r from-primary to-brand text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t("favorites.startShopping")}
            </Button>
          </div>
        ) : (
          <>
            {/* Favorites List */}
            <div className="space-y-5">
              {favorites.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex items-center gap-4 p-4 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-blue-100/50 dark:border-gray-700 transition-all duration-300">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border border-blue-200 dark:border-gray-700"
                    />
                    <CardContent className="flex-1">
                      <CardTitle className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                        {item.name}
                      </CardTitle>
                      <p className="text-blue-700 dark:text-blue-200 mt-1 font-medium">
                        {t("checkout.total")}:{" "}
                        <span className="font-semibold text-blue-800 dark:text-blue-400">
                          {item.price} {t("common.currency")}
                        </span>
                      </p>
                    </CardContent>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className="border-primary text-primary hover:bg-brand hover:text-white transition-all duration-300 rounded-full"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {t("favorites.addToCart")}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromFavorites(item.id)}
                        className="rounded-full hover:scale-105 transition-transform"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-blue-100/50 dark:border-gray-700">
              <span className="font-semibold text-blue-900 dark:text-blue-300">
                {t("favorites.productCount")}: {favorites.length}
              </span>
              <Button
                onClick={() => navigate("/store")}
                className="relative flex items-center bg-gradient-to-r from-primary to-brand text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t("favorites.continueShopping")}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
