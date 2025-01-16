import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const benefits = [
    "Pas d'effets secondaires car c'est une combinaison de nutriments actifs",
    "Rapide, efficace, au gout agréable",
    "Elimine les déchets du trajet intestinal",
    "Elimine les graisses nocives stockées depuis longtemps dans l'appareil digestif",
    "Stimule de bonnes bactéries telles que les BIFIDUS",
    "Favorise les mouvements péristaltiques de l'intestin",
    "Aide à prévenir l'accumulation de matières grasses",
    "Réduit également le mauvais cholestérol"
  ];

  const ingredients = [
    {
      name: "Fibre de Plante",
      description: "Elle lubrifie l'intestin et aide à la bonne élimination des selles. Elle soulage la diarrhée et absorbe l'excès d'eau dans l'intestin."
    },
    {
      name: "Avoine Organique",
      description: "Agit comme une éponge qui absorbe le mauvais cholesterol et qui réduit le risque de maladies cardio-vasculaires."
    },
    {
      name: "L'inuline",
      description: "Favorise la croissance de bonnes bactéries dans l'intestin et diminue la croissance de bactéries nocives. Aide à soulager le diabète."
    },
    {
      name: "La Baie Roselle",
      description: "Elimine les toxines et permet de baisser la fièvre. Réduit les boutons et les problèmes de peau et prévient le dommage du foie."
    },
    {
      name: "Le Garcinia Cambogia",
      description: "Favorise l'amincissement en diminuant l'appétit et permet au métabolisme de brûler plus d'hydrates de carbone."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            SHAKE OFF PHYTO FIBER
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Un excellent Désintoxiquant naturel pour votre bien-être
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <img 
              src="/lovable-uploads/d879f1bd-274a-4542-9c4e-8613accba9ce.png" 
              alt="Shake Off Product"
              className="w-full max-w-md rounded-lg shadow-xl"
            />
          </div>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            Commander Maintenant
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Avantages de l'utilisation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-gray-600">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Ingrédients majeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ingredient, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-green-700">{ingredient.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{ingredient.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Mode d'emploi
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <ol className="space-y-4 text-gray-600">
                <li>1. Verser le contenu d'un sachet de SHAKE OFF dans un verre Shaker.</li>
                <li>2. Ajouter 250 ml d'eau froide.</li>
                <li>3. Fermer hermétiquement et bien secouer (5 secondes)</li>
                <li>4. Boire immédiatement (Très important)</li>
                <li>5. Boire ensuite au moins 500 ml d'eau (2 verres) après avoir pris le Shake Off.</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-green-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Commencez votre détox aujourd'hui !
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            100% Naturel et efficace pour votre bien-être
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            Commander Maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;