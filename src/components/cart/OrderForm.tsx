import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { OrderSummary } from "./OrderSummary";
import { PaymentProofUpload } from "./PaymentProofUpload";

const PRICE_PER_BOX = 25800;

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  phone: z.string().min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres"),
  quantity: z.number().min(1, "La quantité minimum est de 1").max(100, "La quantité maximum est de 100"),
  paymentMethod: z.enum(["orange", "wave"], {
    required_error: "Veuillez choisir une méthode de paiement",
  }),
});

export const OrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentProof, setShowPaymentProof] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<"orange" | "wave">("orange");
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      phone: "",
      quantity: 1,
      paymentMethod: "orange",
    },
  });

  const quantity = form.watch("quantity");
  const paymentMethod = form.watch("paymentMethod");
  const totalPrice = quantity * PRICE_PER_BOX;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const { data: order, error } = await supabase
        .from('orders')
        .insert([
          {
            full_name: values.fullName,
            email: values.email,
            address: values.address,
            phone: values.phone,
            quantity: values.quantity,
            payment_method: values.paymentMethod,
            total_price: totalPrice,
            status: 'pending',
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de l\'enregistrement de la commande:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement de votre commande. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      console.log('Commande enregistrée:', order);

      // Stocker les infos pour l'upload de preuve
      setCurrentOrderId(order.id);
      setCurrentPaymentMethod(values.paymentMethod);
      setCurrentTotalPrice(totalPrice);

      // Afficher le formulaire d'upload de preuve
      setShowPaymentProof(true);

      toast({
        title: "✅ Commande enregistrée !",
        description: "Veuillez maintenant effectuer le paiement et envoyer votre preuve.",
        duration: 5000,
      });

    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentProofSuccess = () => {
    setShowPaymentProof(false);
    setCurrentOrderId(null);
    form.reset();
  };

  const handlePaymentProofClose = () => {
    setShowPaymentProof(false);
    form.reset();
    toast({
      title: "Commande en attente",
      description: "Vous pouvez nous envoyer la preuve de paiement par WhatsApp ou repasser commande.",
      duration: 8000,
    });
  };

  // Afficher le formulaire d'upload de preuve si une commande est en cours
  if (showPaymentProof && currentOrderId) {
    return (
      <PaymentProofUpload
        orderId={currentOrderId}
        paymentMethod={currentPaymentMethod}
        totalPrice={currentTotalPrice}
        onSuccess={handlePaymentProofSuccess}
        onClose={handlePaymentProofClose}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom complet</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse de livraison</FormLabel>
              <FormControl>
                <Input placeholder="123 Rue Example" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+221 77 123 45 67" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantité</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PaymentMethodSection form={form} />

        <OrderSummary
          quantity={quantity}
          pricePerBox={PRICE_PER_BOX}
          totalPrice={totalPrice}
        />

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Traitement en cours..." : "Procéder au paiement"}
        </Button>
      </form>
    </Form>
  );
};