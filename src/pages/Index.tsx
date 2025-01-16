import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    </div>
  );
};

export default Index;