import { motion } from "framer-motion";

interface OrderSummaryProps {
  quantity: number;
  pricePerBox: number;
  totalPrice: number;
}

export const OrderSummary = ({ quantity, pricePerBox, totalPrice }: OrderSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 p-4 rounded-lg space-y-2"
    >
      <h3 className="font-semibold text-green-800">Récapitulatif de la commande</h3>
      <div className="flex justify-between text-sm">
        <span>Prix unitaire:</span>
        <span>{pricePerBox.toLocaleString()} FCFA</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Quantité:</span>
        <span>{quantity} boîte(s)</span>
      </div>
      <div className="flex justify-between font-bold text-green-800 border-t border-green-200 pt-2 mt-2">
        <span>Total:</span>
        <span>{totalPrice.toLocaleString()} FCFA</span>
      </div>
    </motion.div>
  );
};