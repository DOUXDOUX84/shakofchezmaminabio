import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartButton } from "../cart/CartButton";
import { OrderForm } from "../cart/OrderForm";

export const CartForm = () => {
  return (
    <Sheet>
      <CartButton />
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-green-800">Votre commande</SheetTitle>
          <SheetDescription>
            Remplissez le formulaire ci-dessous pour passer votre commande
          </SheetDescription>
        </SheetHeader>
        <OrderForm />
      </SheetContent>
    </Sheet>
  );
};