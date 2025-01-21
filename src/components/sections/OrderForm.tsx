import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface OrderFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  payment_method: string;
}

export const OrderForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>();

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      const totalPrice = data.quantity * 15000; // 15000 FCFA per unit
      
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="full_name">Nom complet</Label>
        <Input
          id="full_name"
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
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          {...register("phone", { required: "Ce champ est requis" })}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="address">Adresse de livraison</Label>
        <Input
          id="address"
          {...register("address", { required: "Ce champ est requis" })}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="quantity">Quantité</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
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

      <div>
        <Label htmlFor="payment_method">Mode de paiement</Label>
        <select
          id="payment_method"
          className="w-full p-2 border rounded-md"
          {...register("payment_method", { required: "Ce champ est requis" })}
        >
          <option value="">Sélectionnez un mode de paiement</option>
          <option value="cash">Paiement à la livraison</option>
          <option value="wave">Wave</option>
          <option value="orange_money">Orange Money</option>
          <option value="free_money">Free Money</option>
        </select>
        {errors.payment_method && (
          <p className="text-red-500 text-sm">{errors.payment_method.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isSubmitting ? "Envoi en cours..." : "Commander"}
      </Button>
    </form>
  );
};