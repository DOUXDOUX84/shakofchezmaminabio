import { useImageUrls } from "@/config/images";
import { HeroContent } from "./hero/HeroContent";
import { HeroImage } from "./hero/HeroImage";

export const HeroSection = () => {
  const { loading } = useImageUrls();

  if (loading) {
    return <div className="min-h-[90vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
    <section className="relative pt-20 md:pt-24 min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-yellow-50 overflow-hidden py-12 px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5" />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};