import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const ingredients = [
  {
    name: "Fibre Végétale",
    description: "Source naturelle de fibres alimentaires essentielles pour la santé digestive",
    benefits: [
      "Favorise un transit intestinal régulier",
      "Aide à éliminer les toxines",
      "Procure un effet rassasiant"
    ],
    icon: "🌱"
  },
  {
    name: "Avoine Organique",
    description: "Céréale complète riche en fibres solubles et en nutriments",
    benefits: [
      "Régule le taux de cholestérol",
      "Stabilise la glycémie",
      "Soutient la santé cardiovasculaire"
    ],
    icon: "🌾"
  },
  {
    name: "Inuline",
    description: "Prébiotique naturel qui nourrit les bonnes bactéries intestinales",
    benefits: [
      "Stimule la croissance des probiotiques",
      "Améliore l'absorption des minéraux",
      "Renforce le système immunitaire"
    ],
    icon: "🦠"
  },
  {
    name: "Baie de Roselle",
    description: "Plante aux propriétés antioxydantes et détoxifiantes",
    benefits: [
      "Soutient la détoxification du foie",
      "Riche en vitamine C",
      "Propriétés anti-inflammatoires"
    ],
    icon: "🫐"
  },
  {
    name: "Garcinia Cambogia",
    description: "Fruit tropical aux propriétés amincissantes naturelles",
    benefits: [
      "Aide à la gestion du poids",
      "Régule l'appétit",
      "Favorise le métabolisme des graisses"
    ],
    icon: "🍊"
  }
];

export const IngredientsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-yellow-50/30 to-green-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Composition 100% Naturelle
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Découvrez les ingrédients soigneusement sélectionnés qui font de Shake Off Phyto Fiber un produit unique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-green-100 bg-gradient-to-br from-white to-green-50/50">
                    <CardHeader>
                      <div className="text-4xl mb-4">{ingredient.icon}</div>
                      <CardTitle className="text-xl text-green-800">
                        {ingredient.name}
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        {ingredient.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span>{ingredient.icon}</span>
                      {ingredient.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <h4 className="font-semibold text-green-800 mb-2">Bienfaits principaux :</h4>
                    <ul className="space-y-2">
                      {ingredient.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="text-green-500">✓</span>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};