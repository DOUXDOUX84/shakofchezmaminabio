import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PaymentMethodSection } from "./order/PaymentMethodSection";
import { OrderSummary } from "./order/OrderSummary";

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
  const methods = useForm<OrderFormData>({
    defaultValues: {
      payment_method: "orange_money",
      quantity: 1
    }
  });
  
  const { register, handleSubmit, watch, formState: { errors } } = methods;
  const quantity = watch("quantity", 1);
  const unitPrice = 25800;

  const onSubmit = async (data: OrderFormData) => {
    console.log("Submitting form with data:", data); // Debugging log
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert([
          { 
            ...data,
            total_price: quantity * unitPrice,
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
      console.error("Form submission error:", error); // Debugging log
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
    <FormProvider {...methods}>
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

          <PaymentMethodSection 
            errors={errors}
          />

          <OrderSummary 
            quantity={quantity} 
            unitPrice={unitPrice}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? "Envoi en cours..." : "Procéder au paiement"}
        </Button>
      </form>
    </FormProvider>
  );
};