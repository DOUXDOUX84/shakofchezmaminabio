import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useImageUrls } from "@/config/images";

export const OrderSection = () => {
  const { siteImages, loading } = useImageUrls();

  const paymentMethods = [
    {
      name: "VISA",
      image: siteImages.visa,
      description: "Paiement sécurisé par carte VISA",
      onClick: () => {
        console.log("Paiement par VISA sélectionné");
      }
    },
    {
      name: "Orange Money",
      image: siteImages.orangeMoney,
      description: "Paiement mobile via Orange Money",
      onClick: () => {
        console.log("Paiement par Orange Money sélectionné");
      }
    },
    {
      name: "WAVE",
      image: siteImages.wave,
      description: "Paiement rapide avec WAVE",
      onClick: () => {
        console.log("Paiement par WAVE sélectionné");
      }
    }
  ];

  if (loading) {
    return <div className="flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition hover:scale-105"
        >
          Commander maintenant
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <div className="space-y-6 py-6">
          <h3 className="text-2xl font-bold text-green-800 mb-6">Choisissez votre moyen de paiement</h3>
          <div className="grid gap-6">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={method.onClick}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative flex items-center justify-center">
                    <img
                      src={method.image}
                      alt={`Paiement ${method.name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">
                      {method.name}
                    </h3>
                    <p className="text-green-700">
                      {method.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};