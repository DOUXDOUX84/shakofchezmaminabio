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
import { useTranslation } from "@/i18n/LanguageContext";

const PRICE_PER_BOX = 25800;

export const OrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentProof, setShowPaymentProof] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<"orange" | "wave">("orange");
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);
  const { t, language } = useTranslation();

  // Vérifier s'il y a un prix promo dans localStorage
  const [promoPrice, setPromoPrice] = useState<number | null>(() => {
    const storedPromoPrice = localStorage.getItem('promoPrice');
    if (storedPromoPrice) {
      const price = parseInt(storedPromoPrice);
      if (!isNaN(price) && price > 0) {
        // Nettoyer après utilisation
        localStorage.removeItem('promoPrice');
        return price;
      }
    }
    return null;
  });
  const isPromoOrder = promoPrice !== null && promoPrice > 0;

  // Dynamic validation messages based on language
  const formSchema = z.object({
    fullName: z.string().min(2, t("validation.nameRequired")),
    email: z.string().email(t("validation.emailInvalid")).optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
    phone: z.string().min(9, t("validation.phoneRequired")),
    quantity: z.number().min(1, t("validation.quantityMin")).max(100, t("validation.quantityMax")),
    paymentMethod: z.enum(["orange", "wave"], {
      required_error: t("validation.paymentRequired"),
    }),
  });

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

  // Si c'est une promo, utiliser le prix promo, sinon calculer normalement
  const totalPrice = isPromoOrder && promoPrice ? promoPrice : quantity * PRICE_PER_BOX;

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
        console.error('Error saving order:', error);
        toast({
          title: t("common.error"),
          description: t("order.orderError"),
          variant: "destructive",
        });
        return;
      }

      console.log('Order saved:', order);

      // Store info for proof upload
      setCurrentOrderId(order.id);
      setCurrentPaymentMethod(values.paymentMethod);
      setCurrentTotalPrice(totalPrice);

      // Show proof upload form
      setShowPaymentProof(true);

      toast({
        title: `✅ ${t("order.orderSuccess")}`,
        description: t("order.orderSuccessMessage"),
        duration: 5000,
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: t("common.error"),
        description: t("order.orderError"),
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
      title: language === "fr" ? "Commande en attente" : "Order pending",
      description: language === "fr"
        ? "Vous pouvez nous envoyer la preuve de paiement par WhatsApp ou repasser commande."
        : "You can send us the payment proof via WhatsApp or place a new order.",
      duration: 8000,
    });
  };

  // Show proof upload form if an order is in progress
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
              <FormLabel>{t("order.fullName")}</FormLabel>
              <FormControl>
                <Input placeholder={language === "fr" ? "Prénom Nom" : "First Last"} {...field} />
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
              <FormLabel>{t("order.email")} <span className="text-gray-400 font-normal">({t("common.optional")})</span></FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("order.emailOptional")} {...field} />
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
              <FormLabel>{t("order.address")} <span className="text-gray-400 font-normal">({t("common.optional")})</span></FormLabel>
              <FormControl>
                <Input placeholder={t("order.addressPlaceholder")} {...field} />
              </FormControl>
              <p className="text-xs text-gray-500 mt-1">{t("order.addressNote")}</p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("order.phone")}</FormLabel>
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
              <FormLabel>{t("common.quantity")}</FormLabel>
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
          isPromo={isPromoOrder}
        />

        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("common.processing") : t("common.checkout")}
        </Button>
      </form>
    </Form>
  );
};