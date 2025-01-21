import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Image, ImageMinus, ImagePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ImageData = {
  id: string;
  key: string;
  url: string;
  alt_text: string | null;
  description: string | null;
};

export const ImageAdminPanel = () => {
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: images, refetch } = useQuery({
    queryKey: ["admin-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("key");

      if (error) {
        console.error("Error fetching images:", error);
        toast.error("Erreur lors du chargement des images");
        throw error;
      }

      return data as ImageData[];
    },
  });

  const handleUpdateImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingImage) return;

    const formData = new FormData(e.currentTarget);
    const updates = {
      url: formData.get("url") as string,
      alt_text: formData.get("alt_text") as string,
      description: formData.get("description") as string,
    };

    const { error } = await supabase
      .from("images")
      .update(updates)
      .eq("id", editingImage.id);

    if (error) {
      console.error("Error updating image:", error);
      toast.error("Erreur lors de la mise à jour de l'image");
      return;
    }

    toast.success("Image mise à jour avec succès");
    setIsDialogOpen(false);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Image className="w-4 h-4" />
                {image.key}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-md">
                <img
                  src={image.url}
                  alt={image.alt_text || image.key}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground truncate">
                  URL: {image.url}
                </p>
                {image.alt_text && (
                  <p className="text-sm text-muted-foreground truncate">
                    Alt: {image.alt_text}
                  </p>
                )}
              </div>
              <Dialog open={isDialogOpen && editingImage?.id === image.id} 
                     onOpenChange={(open) => {
                       setIsDialogOpen(open);
                       if (!open) setEditingImage(null);
                     }}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setEditingImage(image)}
                  >
                    Modifier
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Modifier l'image: {image.key}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUpdateImage} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="url" className="text-sm font-medium">
                        URL de l'image
                      </label>
                      <Input
                        id="url"
                        name="url"
                        defaultValue={image.url}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="alt_text" className="text-sm font-medium">
                        Texte alternatif
                      </label>
                      <Input
                        id="alt_text"
                        name="alt_text"
                        defaultValue={image.alt_text || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <Input
                        id="description"
                        name="description"
                        defaultValue={image.description || ""}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sauvegarder
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};