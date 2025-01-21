import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const benefits = [
  "Pas d'effets secondaires car c'est une combinaison de nutriments actifs",
  "Rapide, efficace, au goût agréable",
  "Élimine les déchets du trajet intestinal",
  "Élimine les graisses nocives stockées depuis longtemps dans l'appareil digestif",
  "Stimule de bonnes bactéries telles que les BIFIDUS",
  "Favorise les mouvements péristaltiques de l'intestin",
  "Aide à prévenir l'accumulation de matières grasses",
  "Réduit également le mauvais cholestérol"
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">
          Les Bienfaits de Shake Off Phyto Fiber
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow border-green-100 bg-gradient-to-br from-white to-green-50"
            >
              <CardContent className="pt-6">
                <p className="text-gray-700">{benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};