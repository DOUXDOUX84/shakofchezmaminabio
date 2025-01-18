import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type SiteImage = {
  id: string;
  key: string;
  url: string;
  alt_text: string | null;
  description: string | null;
};

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

        const imageMap = (data || []).reduce((acc, img) => ({
          ...acc,
          [img.key]: img
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

    // Initial fetch
    fetchImages();

    // Subscribe to changes
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
          // Refetch all images when any change occurs
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