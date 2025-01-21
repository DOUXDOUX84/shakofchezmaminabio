import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ProductInfoDialog } from "./ProductInfoDialog";
import { useState } from "react";

export const HeroContent = () => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center md:text-left space-y-6"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 leading-tight">
        Découvrez SHAKE OFF Phyto Fiber
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-green-700 max-w-xl mx-auto md:mx-0">
        Votre solution naturelle pour une détoxification efficace et un bien-être digestif optimal
      </p>
      <Dialog open={showMoreInfo} onOpenChange={setShowMoreInfo}>
        <DialogTrigger asChild>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 text-base md:text-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            En savoir plus
          </Button>
        </DialogTrigger>
        <ProductInfoDialog />
      </Dialog>
    </motion.div>
  );
};