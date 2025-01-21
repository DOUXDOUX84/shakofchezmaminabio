import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WavePayment } from './WavePayment';

interface PaymentMethodSectionProps {
  paymentMethod: string;
  register: any;
  errors: any;
}

export const PaymentMethodSection: React.FC<PaymentMethodSectionProps> = ({ 
  paymentMethod, 
  register, 
  errors 
}) => {
  console.log("Current payment method:", paymentMethod); // Debugging log

  return (
    <div className="space-y-3">
      <Label>Méthode de paiement</Label>
      <div className="space-y-3">
        <RadioGroup 
          defaultValue="orange_money"
          className="space-y-3"
          {...register("payment_method", { required: "Ce champ est requis" })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="orange_money" id="orange_money" />
            <Label htmlFor="orange_money" className="text-sm">Orange Money (+221776344286)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wave" id="wave" />
            <Label htmlFor="wave" className="text-sm">Wave</Label>
          </div>
        </RadioGroup>
        {errors.payment_method && (
          <p className="text-red-500 text-sm">{errors.payment_method.message}</p>
        )}
      </div>
      
      {paymentMethod?.toLowerCase() === "wave" && <WavePayment />}
    </div>
  );
};