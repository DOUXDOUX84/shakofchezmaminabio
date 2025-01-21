import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface OrderFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  payment_method: "orange_money" | "wave";
}

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<OrderFormData>();
  
  const paymentMethod = watch("payment_method");
  const quantity = watch("quantity", 1);
  const unitPrice = 25800; // Prix unitaire en FCFA
  const totalPrice = quantity * unitPrice;

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          { 
            ...data,
            total_price: totalPrice,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Commande envoyée avec succès!",
        description: "Nous vous contacterons bientôt pour confirmer votre commande.",
      });
      
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre commande. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name">Nom complet</Label>
          <Input
            id="full_name"
            placeholder="John Doe"
            {...register("full_name", { required: "Ce champ est requis" })}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm">{errors.full_name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email", { 
              required: "Ce champ est requis",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Adresse email invalide"
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="address">Adresse de livraison</Label>
          <Input
            id="address"
            placeholder="123 Rue Example"
            {...register("address", { required: "Ce champ est requis" })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            placeholder="+221 77 123 45 67"
            {...register("phone", { required: "Ce champ est requis" })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="quantity">Quantité</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            defaultValue="1"
            {...register("quantity", { 
              required: "Ce champ est requis",
              min: {
                value: 1,
                message: "La quantité minimum est 1"
              }
            })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label>Méthode de paiement</Label>
          <RadioGroup 
            defaultValue="orange_money"
            className="space-y-3"
            {...register("payment_method", { required: "Ce champ est requis" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="orange_money" id="orange_money" />
              <Label htmlFor="orange_money">Orange Money (+221776344286)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wave" id="wave" />
              <Label htmlFor="wave">Wave</Label>
            </div>
          </RadioGroup>
          {errors.payment_method && (
            <p className="text-red-500 text-sm">{errors.payment_method.message}</p>
          )}
        </div>

        {paymentMethod === "wave" && (
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <p className="text-sm text-blue-800">Paiement Wave disponible via QR code ou lien direct :</p>
            <div className="flex flex-col items-center space-y-3">
              <img 
                src="/lovable-uploads/d7272e63-3e15-4089-9430-73d262e04a51.png" 
                alt="QR Code Wave"
                className="w-48 h-48"
              />
              <a 
                href="https://pay.wave.com/m/M_MO1NT4Bhh6eN/c/sn/" 
                className="text-blue-600 hover:text-blue-800 text-sm underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cliquez ici pour payer avec Wave
              </a>
            </div>
          </div>
        )}

        <div className="bg-green-50 p-4 rounded-lg space-y-2">
          <h3 className="font-medium text-green-800">Récapitulatif de la commande</h3>
          <div className="flex justify-between text-sm">
            <span>Prix unitaire:</span>
            <span>{unitPrice.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Quantité:</span>
            <span>{quantity} boîte(s)</span>
          </div>
          <div className="flex justify-between font-medium text-green-800">
            <span>Total:</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isSubmitting ? "Envoi en cours..." : "Procéder au paiement"}
      </Button>
    </form>
  );
};