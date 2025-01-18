import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type SiteImage = {
  id: string;
  key: string;
  url: string;
  alt_text: string | null;
  description: string | null;
};

type ImagesResponse = Database['public']['Tables']['images']['Row'];

export const useImages = () => {
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('images')
          .select('*');

        if (fetchError) throw fetchError;

        const imageMap = (data || []).reduce<Record<string, SiteImage>>((acc, img) => ({
          ...acc,
          [img.key]: img as SiteImage
        }), {});

        setImages(imageMap);
        setError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'images'
        },
        (payload) => {
          console.log('Image change detected:', payload);
          fetchImages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { images, loading, error };
};