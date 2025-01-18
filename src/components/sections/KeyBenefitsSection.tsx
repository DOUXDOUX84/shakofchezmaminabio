import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const keyBenefits = [
  {
    id: "detox",
    title: "Détoxification Naturelle",
    description: "Un nettoyage en profondeur de votre système digestif grâce aux fibres naturelles",
    details: [
      "Élimine les toxines accumulées",
      "Nettoie le côlon en douceur",
      "Améliore le transit intestinal",
      "Réduit les ballonnements"
    ],
    icon: "🌿"
  },
  {
    id: "prevention",
    title: "Prévention Santé",
    description: "Protection active contre divers problèmes de santé",
    details: [
      "Prévient les maladies du côlon",
      "Régule le cholestérol",
      "Renforce le système immunitaire",
      "Améliore la santé intestinale"
    ],
    icon: "🛡️"
  },
  {
    id: "digestion",
    title: "Digestion Optimale",
    description: "Amélioration significative de votre digestion quotidienne",
    details: [
      "Facilite la digestion",
      "Réduit la constipation",
      "Équilibre la flore intestinale",
      "Améliore l'absorption des nutriments"
    ],
    icon: "✨"
  }
];

export const KeyBenefitsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-green-800 mb-4">
            Découvrez les Bienfaits Exceptionnels
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Shake Off Phyto Fiber offre une approche complète pour votre bien-être digestif
          </p>
        </motion.div>

        <Tabs defaultValue="detox" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-transparent">
            {keyBenefits.map((benefit) => (
              <TabsTrigger
                key={benefit.id}
                value={benefit.id}
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800 px-3 py-2 text-sm md:text-base whitespace-normal h-auto min-h-[48px] flex items-center justify-center text-center"
              >
                <span className="mr-2">{benefit.icon}</span>
                {benefit.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {keyBenefits.map((benefit) => (
            <TabsContent
              key={benefit.id}
              value={benefit.id}
              className="mt-6 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 md:p-8"
              >
                <div className="text-center mb-6">
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
                <ul className="space-y-3">
                  {benefit.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-left text-gray-700"
                    >
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-sm md:text-base">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};