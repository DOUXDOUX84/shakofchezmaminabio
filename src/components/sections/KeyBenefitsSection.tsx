import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/i18n/LanguageContext";

export const KeyBenefitsSection = () => {
  const { language } = useTranslation();

  const keyBenefits = language === "fr" ? [
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
  ] : [
    {
      id: "detox",
      title: "Natural Detoxification",
      description: "Deep cleansing of your digestive system with natural fibers",
      details: [
        "Eliminates accumulated toxins",
        "Gently cleanses the colon",
        "Improves intestinal transit",
        "Reduces bloating"
      ],
      icon: "🌿"
    },
    {
      id: "prevention",
      title: "Health Prevention",
      description: "Active protection against various health issues",
      details: [
        "Prevents colon diseases",
        "Regulates cholesterol",
        "Strengthens the immune system",
        "Improves intestinal health"
      ],
      icon: "🛡️"
    },
    {
      id: "digestion",
      title: "Optimal Digestion",
      description: "Significant improvement in your daily digestion",
      details: [
        "Facilitates digestion",
        "Reduces constipation",
        "Balances intestinal flora",
        "Improves nutrient absorption"
      ],
      icon: "✨"
    }
  ];

  const sectionTitle = language === "fr"
    ? "Découvrez les Bienfaits Exceptionnels"
    : "Discover the Exceptional Benefits";

  const sectionSubtitle = language === "fr"
    ? "Shake Off Phyto Fiber offre une approche complète pour votre bien-être digestif"
    : "Shake Off Phyto Fiber offers a complete approach to your digestive wellness";

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
            {sectionTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        <Tabs defaultValue="detox" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-transparent">
            {keyBenefits.map((benefit) => (
              <TabsTrigger
                key={benefit.id}
                value={benefit.id}
                className="relative overflow-hidden group bg-white border-2 border-transparent data-[state=active]:border-green-500 rounded-xl px-6 py-4 text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg data-[state=active]:shadow-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-50 data-[state=active]:to-white"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-green-800 group-data-[state=active]:text-green-700">
                    {benefit.title}
                  </span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {keyBenefits.map((benefit) => (
            <TabsContent
              key={benefit.id}
              value={benefit.id}
              className="mt-8 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-green-100"
              >
                <div className="text-center mb-8">
                  <span className="text-5xl mb-6 block animate-bounce">{benefit.icon}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{benefit.description}</p>
                </div>
                <ul className="space-y-4">
                  {benefit.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-left text-gray-700 bg-green-50/50 p-4 rounded-lg hover:bg-green-50 transition-colors duration-300"
                    >
                      <span className="text-green-500 mr-4 text-xl">✓</span>
                      <span className="text-base md:text-lg">{detail}</span>
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