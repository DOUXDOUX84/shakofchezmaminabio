import { CartForm } from "./CartForm";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

const InternationalButton = ({ 
  href, 
  countries, 
  flags 
}: { 
  href: string; 
  countries: string; 
  flags: string;
}) => (
  <Button
    variant="outline"
    className="flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    onClick={() => window.open(href, '_blank')}
  >
    <div className="flex items-center gap-1">
      <Flag className="h-5 w-5" />
      <span className="text-xl">{flags}</span>
    </div>
    <span className="text-sm sm:text-base">{countries}</span>
  </Button>
);

export const OrderSection = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <CartForm />
      
      <InternationalButton
        href="https://edmarkusa.com/?referrer=SNFDK000142"
        countries="BUY IN USA"
        flags="🇺🇸"
      />
      
      <InternationalButton
        href="https://referral.edmarker.com/SNFDK000142"
        countries="BUY IN UAE, SA, MY, GH, TZ"
        flags="🇦🇪 🇿🇦 🇲🇾 🇬🇭 🇹🇿"
      />
    </div>
  );
};