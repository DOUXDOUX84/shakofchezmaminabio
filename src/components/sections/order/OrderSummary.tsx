import React from 'react';

interface OrderSummaryProps {
  quantity: number;
  unitPrice: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ quantity, unitPrice }) => {
  const totalPrice = quantity * unitPrice;

  return (
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-medium text-green-800 mb-2">Récapitulatif de la commande</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Prix unitaire:</span>
          <span>{unitPrice.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between">
          <span>Quantité:</span>
          <span>{quantity} boîte(s)</span>
        </div>
        <div className="flex justify-between font-medium text-green-800 mt-2 pt-2 border-t border-green-200">
          <span>Total:</span>
          <span>{totalPrice.toLocaleString()} FCFA</span>
        </div>
      </div>
    </div>
  );
};