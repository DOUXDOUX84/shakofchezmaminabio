import { getImageByType } from '../lib/api';

export const getSiteImages = async () => {
  try {
    const productHero = await getImageByType('hero');
    const productPackaging = await getImageByType('packaging');

    return {
      productHero,
      productPackaging,
      // Images alternatives de secours
      alternativeHero: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      alternativePackaging: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    // Retourne les images par défaut en cas d'erreur
    return {
      productHero: "/lovable-uploads/647cfe48-3107-4bc8-80b1-c478f0cc4cb9.png",
      productPackaging: "/lovable-uploads/269d88e5-bc61-48cc-bd76-af48f95c608c.png",
      alternativeHero: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      alternativePackaging: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    };
  }
};