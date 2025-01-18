import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { siteImages } from "@/config/images";
import { useIsMobile } from "@/hooks/use-mobile";

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

const productInfo = {
  title: "SHAKE OFF Phyto Fiber",
  description: "Un excellent Désintoxiquant naturel",
  details: [
    "Dans la phytothérapie, le concept de rajeunissement et de désintoxication est tout aussi important que l'alimentation équilibrée.",
    "Cette boisson nutritionnelle est composée d'ingrédients naturels qui nettoient et évacuent les déchets et toxines du colon.",
    "Après la consommation, vous serez surpris de constater les déchets accumulés et ressentirez une sensation incroyablement confortable."
  ],
  packaging: "Boîte de 12 sachets de 20g",
  warning: "Bien que la plupart des gens soient conscients de l'importance de la nutrition, peu se focalisent sur la désintoxication de l'intestin et du colon.",
  effect: "Lorsque le système digestif n'est pas nettoyé, il perd sa capacité à absorber les éléments nutritifs. Des déchets résiduels restent très souvent dans les intestins, même avec des selles régulières."
};

const Index = () => {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const isMobile = useIsMobile();

  const handleImageClick = (imageSrc: string) => {
    if (isMobile) return;
    if (zoomedImage === imageSrc) {
      setZoomedImage(null);
    } else {
      setZoomedImage(imageSrc);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative min-h-[90vh] md:h-[90vh] flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-yellow-50 overflow-hidden py-8 md:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-4 md:mb-6">
                Découvrez SHAKE OFF Phyto Fiber
              </h1>
              <p className="text-lg md:text-xl text-green-700 mb-6 md:mb-8">
                Votre solution naturelle pour une détoxification efficace et un bien-être optimal
              </p>
              <Dialog open={showMoreInfo} onOpenChange={setShowMoreInfo}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg"
                  >
                    En savoir plus
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] md:max-w-4xl h-[80vh] md:h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl md:text-2xl text-green-800 px-2 md:px-0">Informations détaillées</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 md:space-y-8 p-2 md:p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <motion.img
                        src={siteImages.productInfo1}
                        alt="Information détaillée 1"
                        className={`w-full rounded-lg shadow-xl transition-transform duration-300 ${
                          !isMobile ? 'cursor-pointer' : ''
                        } ${zoomedImage === siteImages.productInfo1 && !isMobile ? "scale-150" : ""}`}
                        onClick={() => handleImageClick(siteImages.productInfo1)}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative"
                    >
                      <motion.img
                        src={siteImages.productInfo2}
                        alt="Information détaillée 2"
                        className={`w-full rounded-lg shadow-xl transition-transform duration-300 ${
                          !isMobile ? 'cursor-pointer' : ''
                        } ${zoomedImage === siteImages.productInfo2 && !isMobile ? "scale-150" : ""}`}
                        onClick={() => handleImageClick(siteImages.productInfo2)}
                      />
                    </motion.div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.img
                src={siteImages.productHero}
                alt="Shake Off Phyto Fiber Présentation"
                className="w-full max-w-xl mx-auto rounded-lg shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
      {/* Benefits Section */}
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

      {/* Interactive Key Benefits Section */}
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

      {/* Ingredients Section */}
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
                      <DialogDescription>
                        {ingredient.description}
                      </DialogDescription>
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
    </div>
  );
};

export default Index;
