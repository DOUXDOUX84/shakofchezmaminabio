import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useImageUrls } from "@/config/images";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const ImageCarousel = () => {
  const { siteImages, loading } = useImageUrls();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const images = [
    {
      src: siteImages.productBenefits,
      alt: "Avantages du Shake Off Phyto Fiber"
    },
    {
      src: siteImages.productFeatures,
      alt: "Caractéristiques du Shake Off Phyto Fiber"
    },
    {
      src: siteImages.productInfo1,
      alt: "Informations détaillées 1"
    },
    {
      src: siteImages.productInfo2,
      alt: "Informations détaillées 2"
    }
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      <Carousel
        opts={{
          loop: true,
          duration: 50,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full overflow-hidden rounded-xl bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-auto max-h-[700px] w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn(
          "absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2",
          "bg-white/90 hover:bg-green-500 hover:text-white transition-all duration-300",
          "flex h-12 w-12 items-center justify-center rounded-full",
          "border-2 border-green-500/20 shadow-lg",
          "transform hover:scale-110"
        )}>
          <ArrowLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext className={cn(
          "absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2",
          "bg-white/90 hover:bg-green-500 hover:text-white transition-all duration-300",
          "flex h-12 w-12 items-center justify-center rounded-full",
          "border-2 border-green-500/20 shadow-lg",
          "transform hover:scale-110"
        )}>
          <ArrowRight className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};