import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useImageUrls } from "@/config/images";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      alt: "Avantages du Shake Off Phyto Fiber",
      title: "Avantages et Composants"
    },
    {
      src: siteImages.productFeatures,
      alt: "Caractéristiques du Shake Off Phyto Fiber",
      title: "Caractéristiques Principales"
    },
    {
      src: siteImages.productInfo1,
      alt: "Informations détaillées 1",
      title: "Guide d'Utilisation"
    },
    {
      src: siteImages.productInfo2,
      alt: "Informations détaillées 2",
      title: "Bienfaits pour la Santé"
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
            <CarouselItem key={index} className="pl-2 md:pl-4 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full overflow-hidden rounded-xl bg-white shadow-lg"
              >
                <div className="aspect-auto max-h-[700px] w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-white text-lg md:text-xl font-semibold">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn(
          "absolute -left-12 top-1/2 -translate-y-1/2",
          "bg-white/80 hover:bg-green-500 hover:text-white transition-colors",
          "hidden md:flex"
        )} />
        <CarouselNext className={cn(
          "absolute -right-12 top-1/2 -translate-y-1/2",
          "bg-white/80 hover:bg-green-500 hover:text-white transition-colors",
          "hidden md:flex"
        )} />
      </Carousel>
    </div>
  );
};