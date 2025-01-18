import { motion } from "framer-motion";
import { siteImages } from "@/config/images";

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

export const OrderSection = () => (
  <div className="bg-green-50 rounded-lg shadow-lg p-8 my-8">
    <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Commander maintenant</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {paymentMethods.map((method) => (
        <motion.div
          key={method.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={method.onClick}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
              <img
                src={method.image}
                alt={`Paiement ${method.name}`}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {method.name}
            </h3>
            <p className="text-green-700 text-center">
              {method.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);