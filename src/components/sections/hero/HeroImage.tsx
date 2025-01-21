import { motion } from "framer-motion";
import { useImageUrls } from "@/config/images";

export const HeroImage = () => {
  const { siteImages } = useImageUrls();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mt-8 md:mt-0"
    >
      <motion.img
        src={siteImages.productHero}
        alt="Shake Off Phyto Fiber - Solution naturelle pour la détoxification et la santé digestive"
        className="w-full max-w-xl mx-auto rounded-lg shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/lovable-uploads/2b7c5bab-a39f-47dd-b13b-440ca97097ab.png";
        }}
      />
    </motion.div>
  );
};