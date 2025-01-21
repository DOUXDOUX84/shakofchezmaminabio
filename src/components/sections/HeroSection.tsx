import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useState } from "react";
import { useImageUrls } from "@/config/images";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrderSection } from "./OrderSection";

export const HeroSection = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { siteImages, loading } = useImageUrls();

  const handleImageClick = (imageSrc: string) => {
    if (isMobile) return;
    if (zoomedImage === imageSrc) {
      setZoomedImage(null);
    } else {
      setZoomedImage(imageSrc);
    }
  };

  if (loading) {
    return <div className="min-h-[90vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
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
                  <DialogTitle className="text-xl md:text-2xl text-green-800 px-2 md:px-0">
                    Informations détaillées
                  </DialogTitle>
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
  );
};