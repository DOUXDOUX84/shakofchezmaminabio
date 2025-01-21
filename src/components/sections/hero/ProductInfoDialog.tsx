import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useImageUrls } from "@/config/images";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export const ProductInfoDialog = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { siteImages } = useImageUrls();

  const handleImageClick = (imageSrc: string) => {
    if (isMobile) return;
    if (zoomedImage === imageSrc) {
      setZoomedImage(null);
    } else {
      setZoomedImage(imageSrc);
    }
  };

  return (
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
            alt="Détails sur la composition et les bienfaits de Shake Off Phyto Fiber"
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
            alt="Mode d'emploi et recommandations pour Shake Off Phyto Fiber"
            className={`w-full rounded-lg shadow-xl transition-transform duration-300 ${
              !isMobile ? 'cursor-pointer' : ''
            } ${zoomedImage === siteImages.productInfo2 && !isMobile ? "scale-150" : ""}`}
            onClick={() => handleImageClick(siteImages.productInfo2)}
          />
        </motion.div>
      </div>
    </DialogContent>
  );
};