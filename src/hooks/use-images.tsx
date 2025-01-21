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

type ImagesTable = Database['public']['Tables']['images']['Row'];

export const useImages = () => {
  const [images, setImages] = useState<Record<string, SiteImage>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching images from Supabase...');
        const { data, error: fetchError } = await supabase
          .from('images')
          .select('*');

        console.log('Supabase response:', { data, error: fetchError });

        if (fetchError) {
          console.error('Supabase error:', fetchError);
          throw fetchError;
        }

        const imageMap = (data || []).reduce<Record<string, SiteImage>>((acc, img) => ({
          ...acc,
          [img.key]: {
            id: img.id,
            key: img.key,
            url: img.url,
            alt_text: img.alt_text,
            description: img.description
          }
        }), {});

        setImages(imageMap);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching images:', err);
        setError(err.message || 'Failed to load images');
        // In case of error, use empty object to prevent breaking the UI
        setImages({});
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