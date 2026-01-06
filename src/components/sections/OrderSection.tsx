import { CartForm } from "./CartForm";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageContext";

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
    className={`flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in ${className}`}
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
        <span className="text-xl">
          <img
            src="/lovable-uploads/c8d591d1-3674-4be3-a8a6-708390b0fa87.png"
            alt="UAE Flag"
            className="inline-block h-6 w-8 object-cover rounded mr-1"
          />
          <img
            src="/lovable-uploads/75b25f08-5f37-4635-ab83-fe6cf84b06db.png"
            alt="South Africa Flag"
            className="inline-block h-6 w-8 object-cover rounded mr-1"
          />
          <img
            src="/lovable-uploads/dc2949b5-04ab-441e-9a78-ab59d603a9d3.png"
            alt="Malaysia Flag"
            className="inline-block h-6 w-8 object-cover rounded mr-1"
          />
          <img
            src="/lovable-uploads/00e2f476-fa73-4309-85b6-e351f3045ac0.png"
            alt="Ghana Flag"
            className="inline-block h-6 w-8 object-cover rounded mr-1"
          />
          <img
            src="/lovable-uploads/9a6ef139-a761-4b9a-ba17-4f748b969e90.png"
            alt="Tanzania Flag"
            className="inline-block h-6 w-8 object-cover rounded"
          />
        </span>
      )}
    </div>
    <span className="text-sm sm:text-base">{countries}</span>
  </Button>
);

export const OrderSection = () => {
  const { language } = useTranslation();

  const usaText = language === "fr" ? "ACHETER AUX USA" : "BUY IN USA";
  const internationalText = language === "fr"
    ? "ACHETER EN UAE, SA, MY, GH, TZ"
    : "BUY IN UAE, SA, MY, GH, TZ";

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <CartForm />

      <InternationalButton
        href="https://edmarkusa.com/?referrer=SNFDK000142"
        countries={usaText}
        flags="🇺🇸"
        className="hover:bg-blue-50 bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 border-[#0EA5E9]"
      />

      <InternationalButton
        href="https://referral.edmarker.com/SNFDK000142"
        countries={internationalText}
        flags="🇦🇪 🇿🇦 🇲🇾 🇬🇭 🇹🇿"
        className="hover:bg-green-50 bg-green-600 text-white hover:bg-green-700 border-green-600"
      />
    </div>
  );
};