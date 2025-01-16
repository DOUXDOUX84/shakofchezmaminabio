import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight">
                Détoxifiez Naturellement
                <span className="block text-green-600">Votre Corps</span>
              </h1>
              <p className="text-xl text-gray-700 max-w-lg">
                Découvrez Shake Off Phyto Fiber, votre allié naturel pour une détoxification efficace et un système digestif sain.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                >
                  Commander Maintenant
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  En Savoir Plus
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/d879f1bd-274a-4542-9c4e-8613accba9ce.png"
                alt="Shake Off Phyto Fiber"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

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
                className="hover:shadow-lg transition-shadow border-green-100"
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
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Découvrez les Bienfaits Exceptionnels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Shake Off Phyto Fiber offre une approche complète pour votre bien-être digestif
            </p>
          </motion.div>

          <Tabs defaultValue="detox" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {keyBenefits.map((benefit) => (
                <TabsTrigger
                  key={benefit.id}
                  value={benefit.id}
                  className="text-lg py-3"
                >
                  <span className="mr-2">{benefit.icon}</span>
                  {benefit.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {keyBenefits.map((benefit) => (
              <TabsContent key={benefit.id} value={benefit.id}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle className="text-2xl text-green-800">
                        {benefit.title}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {benefit.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefit.details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2 text-gray-700"
                          >
                            <span className="text-green-500">✓</span>
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Commander Maintenant
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-20 bg-white">
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow border-green-100">
                      <CardHeader>
                        <div className="text-4xl mb-4">{ingredient.icon}</div>
                        <CardTitle className="text-xl text-green-800">
                          {ingredient.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
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
