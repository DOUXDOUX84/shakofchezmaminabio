import { HeroSection } from "@/components/sections/HeroSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { KeyBenefitsSection } from "@/components/sections/KeyBenefitsSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { OrderSection } from "@/components/sections/OrderSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BenefitsSection />
      <KeyBenefitsSection />
      <IngredientsSection />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <OrderSection />
        </div>
      </section>
    </div>
  );
};

export default Index;