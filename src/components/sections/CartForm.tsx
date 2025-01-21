import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderForm } from "@/components/sections/OrderForm";

export const CartForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <img 
            src="/lovable-uploads/1f7859aa-0d0d-4317-a68c-5a0f332cc827.png"
            alt="Drapeau du Sénégal"
            className="h-6 w-8 object-cover rounded"
          />
          <ShoppingCart className="w-6 h-6" />
          Ajouter au panier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Commander Shake Off</DialogTitle>
        </DialogHeader>
        <OrderForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};