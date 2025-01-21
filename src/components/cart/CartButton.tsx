import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";

export const CartButton = () => {
  return (
    <SheetTrigger asChild>
      <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition-all duration-300 hover:scale-105 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <img 
              src="/lovable-uploads/4513dd0c-8630-424b-88ab-fec160829bba.png"
              alt="Drapeau du Sénégal"
              className="h-6 w-8 object-cover rounded"
            />
          </div>
          <span>Ajouter au panier</span>
        </div>
      </Button>
    </SheetTrigger>
  );
};