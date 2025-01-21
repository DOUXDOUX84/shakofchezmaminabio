import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Solution 100% Naturelle",
    description: "Pas d'effets secondaires car c'est une combinaison de nutriments actifs"
  },
  {
    title: "Efficacité Rapide",
    description: "Rapide, efficace, au goût agréable"
  },
  {
    title: "Détoxification",
    description: "Élimine les déchets du trajet intestinal"
  },
  {
    title: "Élimination des Graisses",
    description: "Élimine les graisses nocives stockées depuis longtemps dans l'appareil digestif"
  },
  {
    title: "Santé Intestinale",
    description: "Stimule de bonnes bactéries telles que les BIFIDUS"
  },
  {
    title: "Transit Optimal",
    description: "Favorise les mouvements péristaltiques de l'intestin"
  },
  {
    title: "Prévention",
    description: "Aide à prévenir l'accumulation de matières grasses"
  },
  {
    title: "Cholestérol",
    description: "Réduit également le mauvais cholestérol"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white" id="benefices">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-green-800 mb-8 md:mb-12"
        >
          Les Bienfaits de Shake Off Phyto Fiber
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-green-100 bg-gradient-to-br from-white to-green-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-green-700 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};