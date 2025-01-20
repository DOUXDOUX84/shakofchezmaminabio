import { HeroSection } from "@/components/sections/HeroSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { KeyBenefitsSection } from "@/components/sections/KeyBenefitsSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { ContactButton } from "@/components/ContactButton";
import { ImageCarousel } from "@/components/sections/ImageCarousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={() => navigate('/login')}
          variant="outline"
          className="bg-white hover:bg-green-50"
        >
          Connexion Admin
        </Button>
      </div>
      <HeroSection />
      <ImageCarousel />
      <BenefitsSection />
      <KeyBenefitsSection />
      <IngredientsSection />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <OrderSection />
            <ContactButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;