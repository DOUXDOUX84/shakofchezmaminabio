import { HeroSection } from "@/components/sections/HeroSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { KeyBenefitsSection } from "@/components/sections/KeyBenefitsSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { OrderSection } from "@/components/sections/OrderSection";
import { ContactButton } from "@/components/ContactButton";
import { ImageCarousel } from "@/components/sections/ImageCarousel";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ImageCarousel />
      <BenefitsSection />
      <KeyBenefitsSection />
      <IngredientsSection />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <OrderSection />
            <ContactButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;