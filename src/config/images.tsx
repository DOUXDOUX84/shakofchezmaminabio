import { useImages } from "@/hooks/use-images";

export const useImageUrls = () => {
  const { images, loading, error } = useImages();

  return {
    siteImages: {
      productHero: images.productHero?.url || "/lovable-uploads/2b7c5bab-a39f-47dd-b13b-440ca97097ab.png",
      productPackaging: images.productPackaging?.url || "/lovable-uploads/647cfe48-3107-4bc8-80b1-c478f0cc4cb9.png",
      productInfo1: images.productInfo1?.url || "/lovable-uploads/6ca07d38-8645-44ba-a36d-a4c861386e17.png",
      productInfo2: images.productInfo2?.url || "/lovable-uploads/7d4f965d-40e1-4373-a94e-aa7571631bfc.png",
      visa: images.visa?.url || "/lovable-uploads/1405cdb6-6f1f-4cc0-b96c-493f97ad07a8.png",
      orangeMoney: images.orangeMoney?.url || "/lovable-uploads/f4d66ffe-b080-412b-a28c-92bf890601a6.png",
      wave: images.wave?.url || "/lovable-uploads/b78f7bb5-b656-4dc9-ba69-6c7c3a3d55ef.png"
    },
    loading,
    error
  };
};