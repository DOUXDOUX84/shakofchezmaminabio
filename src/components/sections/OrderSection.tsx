import { CartForm } from "./CartForm";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

const InternationalButton = ({ 
  href, 
  countries, 
  flags,
  className 
}: { 
  href: string; 
  countries: string; 
  flags: string;
  className?: string;
}) => (
  <Button
    variant="outline"
    className={`flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
    onClick={() => window.open(href, '_blank')}
  >
    <div className="flex items-center gap-1">
      {countries.includes("USA") ? (
        <img 
          src="/lovable-uploads/7e989e94-d567-4435-964a-099292571788.png" 
          alt="USA Flag"
          className="h-6 w-8 object-cover rounded"
        />
      ) : (
        <>
          <Flag className="h-5 w-5" />
          <span className="text-xl">{flags}</span>
        </>
      )}
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
        className="hover:bg-blue-50 bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 border-[#0EA5E9]"
      />
      
      <InternationalButton
        href="https://referral.edmarker.com/SNFDK000142"
        countries="BUY IN UAE, SA, MY, GH, TZ"
        flags="🇦🇪 🇿🇦 🇲🇾 🇬🇭 🇹🇿"
        className="hover:bg-gray-50 bg-[#8E9196] text-white hover:bg-[#8E9196]/90 border-[#8E9196]"
      />
    </div>
  );
};