import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import { Tag } from "lucide-react";

interface OrderSummaryProps {
  quantity: number;
  pricePerBox: number;
  totalPrice: number;
  isPromo?: boolean;
}

export const OrderSummary = ({ quantity, pricePerBox, totalPrice, isPromo = false }: OrderSummaryProps) => {
  const { t, language } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg space-y-2 ${isPromo ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300" : "bg-green-50"}`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`font-semibold ${isPromo ? "text-orange-700" : "text-green-800"}`}>
          {t("order.orderSummary")}
        </h3>
        {isPromo && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            <Tag className="w-3 h-3" />
            PROMO!
          </div>
        )}
      </div>

      {isPromo ? (
        <>
          <div className="flex justify-between text-sm">
            <span className="text-orange-700 font-medium">{language === "fr" ? "Offre spéciale:" : "Special offer:"}</span>
            <span className="text-orange-700 font-bold">🎁 {language === "fr" ? "Prix promo" : "Promo price"}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t border-orange-200 pt-2 mt-2">
            <span className="text-orange-800">{t("common.total")}:</span>
            <span className="text-orange-600">{totalPrice.toLocaleString()} FCFA</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between text-sm">
            <span>{t("order.pricePerBox")}:</span>
            <span>{pricePerBox.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{t("common.quantity")}:</span>
            <span>{quantity} {quantity > 1 ? t("common.boxes") : t("common.box")}</span>
          </div>
          <div className="flex justify-between font-bold text-green-800 border-t border-green-200 pt-2 mt-2">
            <span>{t("common.total")}:</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
        </>
      )}
    </motion.div>
  );
};