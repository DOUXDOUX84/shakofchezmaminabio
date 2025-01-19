import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  phone: z.string().min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres"),
  quantity: z.number().min(1, "La quantité minimum est de 1").max(100, "La quantité maximum est de 100"),
});

const PRICE_PER_BOX = 15000; // Prix en FCFA

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
    },
  });

  const quantity = form.watch("quantity");
  const totalPrice = quantity * PRICE_PER_BOX;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Commande soumise:", values);
      toast({
        title: "Commande en cours de traitement",
        description: "Nous allons vous rediriger vers la page de paiement...",
      });
      // Ici nous ajouterons la logique de paiement plus tard
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre commande.",
      });
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