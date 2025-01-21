import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

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

const PRICE_PER_BOX = 25800; // Prix en FCFA
const ORANGE_MONEY_NUMBER = "+221776344286";
const WAVE_PAYMENT_LINK = "https://pay.wave.com/m/M_MO1NT4Bhh6eN/c/sn/";

export const CartForm = () => {
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(false);
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
    console.log("Commande soumise:", values);
    
    const paymentInstructions = values.paymentMethod === "orange" 
      ? `Veuillez effectuer le paiement de ${totalPrice.toLocaleString()} FCFA via Orange Money au ${ORANGE_MONEY_NUMBER}`
      : `Veuillez effectuer le paiement de ${totalPrice.toLocaleString()} FCFA via Wave en cliquant sur le lien de paiement ou en scannant le QR code.`;

    toast({
      title: "Commande enregistrée !",
      description: paymentInstructions,
      duration: 10000,
    });

    if (values.paymentMethod === "wave") {
      window.open(WAVE_PAYMENT_LINK, '_blank');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition hover:scale-105">
          Ajouter au panier
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-green-800">Votre commande</SheetTitle>
          <SheetDescription>
            Remplissez le formulaire ci-dessous pour passer votre commande
          </SheetDescription>
        </SheetHeader>

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

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Méthode de paiement</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="orange" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Orange Money ({ORANGE_MONEY_NUMBER})
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="wave" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Wave
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("paymentMethod") === "wave" && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  Paiement Wave disponible via QR code ou lien direct :
                </p>
                <img 
                  src="/lovable-uploads/b0e17f14-65a1-40cc-8f03-015f6a69d1a3.png" 
                  alt="QR Code Wave"
                  className="w-32 h-32 mx-auto mb-2"
                />
                <a 
                  href={WAVE_PAYMENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-sm block text-center"
                >
                  Cliquez ici pour payer avec Wave
                </a>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 p-4 rounded-lg space-y-2"
            >
              <h3 className="font-semibold text-green-800">Récapitulatif de la commande</h3>
              <div className="flex justify-between text-sm">
                <span>Prix unitaire:</span>
                <span>{PRICE_PER_BOX.toLocaleString()} FCFA</span>
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

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Procéder au paiement
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};