import { supabase } from './supabase';

export interface ImageData {
  id: number;
  url: string;
  type: 'hero' | 'packaging' | 'alternative';
  created_at: string;
}

export const fetchImages = async (): Promise<ImageData[]> => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des images:', error);
    throw error;
  }

  return data || [];
};

export const getImageByType = async (type: 'hero' | 'packaging' | 'alternative'): Promise<string> => {
  const { data, error } = await supabase
    .from('images')
    .select('url')
    .eq('type', type)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error(`Erreur lors de la récupération de l'image de type ${type}:`, error);
    return type === 'hero' 
      ? '/lovable-uploads/647cfe48-3107-4bc8-80b1-c478f0cc4cb9.png'
      : '/lovable-uploads/269d88e5-bc61-48cc-bd76-af48f95c608c.png';
  }

  return data.url;
};