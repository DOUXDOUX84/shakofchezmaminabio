import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartButton } from "../cart/CartButton";
import { OrderForm } from "../cart/OrderForm";
import { useTranslation } from "@/i18n/LanguageContext";

export const CartForm = () => {
  const { language } = useTranslation();

  const title = language === "fr" ? "Votre commande" : "Your Order";
  const description = language === "fr"
    ? "Remplissez le formulaire ci-dessous pour passer votre commande"
    : "Fill out the form below to place your order";

  return (
    <Sheet>
      <CartButton />
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-green-800">{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        <OrderForm />
      </SheetContent>
    </Sheet>
  );
};