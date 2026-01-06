import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, Trash2, Edit, Video, Play, ExternalLink, Upload, Link } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";

interface VideoItem {
    id: string;
    title: string;
    description: string | null;
    video_url: string;
    thumbnail_url: string | null;
    is_active: boolean;
    display_order: number;
    created_at: string;
}

export const VideosPanel = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
    const [uploadTab, setUploadTab] = useState<"url" | "file">("url");
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        video_url: "",
        thumbnail_url: "",
        is_active: true,
        display_order: 0,
    });

    const { data: videos, isLoading } = useQuery({
        queryKey: ["videos-admin"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("videos")
                .select("*")
                .order("display_order", { ascending: true });

            if (error) throw error;
            return data as VideoItem[];
        },
    });

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            video_url: "",
            thumbnail_url: "",
            is_active: true,
            display_order: videos?.length || 0,
        });
        setEditingVideo(null);
        setSelectedFile(null);
        setUploadTab("url");
    };

    const openEditDialog = (video: VideoItem) => {
        setEditingVideo(video);
        setFormData({
            title: video.title,
            description: video.description || "",
            video_url: video.video_url,
            thumbnail_url: video.thumbnail_url || "",
            is_active: video.is_active,
            display_order: video.display_order,
        });
        setUploadTab("url");
        setIsDialogOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Vérifier la taille (max 50MB)
            if (file.size > 50 * 1024 * 1024) {
                toast.error("La vidéo est trop volumineuse. Maximum 50 MB.");
                return;
            }
            // Vérifier le type
            if (!file.type.startsWith("video/")) {
                toast.error("Veuillez sélectionner un fichier vidéo.");
                return;
            }
            setSelectedFile(file);
            // Pré-remplir le titre si vide
            if (!formData.title) {
                setFormData({ ...formData, title: file.name.replace(/\.[^/.]+$/, "") });
            }
        }
    };

    const uploadVideoFile = async (): Promise<string | null> => {
        if (!selectedFile) return null;

        try {
            setIsUploading(true);

            // Créer un nom unique
            const fileExt = selectedFile.name.split(".").pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

            // Upload vers Supabase Storage
            const { data, error } = await supabase.storage
                .from("videos")
                .upload(fileName, selectedFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) {
                console.error("Upload error:", error);
                throw error;
            }

            // Obtenir l'URL publique
            const { data: urlData } = supabase.storage
                .from("videos")
                .getPublicUrl(fileName);

            return urlData.publicUrl;
        } catch (error) {
            console.error("Error uploading video:", error);
            toast.error("Erreur lors de l'upload de la vidéo");
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title) {
            toast.error("Le titre est obligatoire");
            return;
        }

        // Vérifier qu'on a soit une URL soit un fichier
        if (uploadTab === "url" && !formData.video_url && !editingVideo) {
            toast.error("Veuillez entrer une URL de vidéo");
            return;
        }
        if (uploadTab === "file" && !selectedFile && !editingVideo) {
            toast.error("Veuillez sélectionner un fichier vidéo");
            return;
        }

        try {
            let videoUrl = formData.video_url;

            // Si on upload un fichier
            if (uploadTab === "file" && selectedFile) {
                const uploadedUrl = await uploadVideoFile();
                if (!uploadedUrl) return;
                videoUrl = uploadedUrl;
            }

            const videoData = {
                title: formData.title,
                description: formData.description || null,
                video_url: videoUrl,
                thumbnail_url: formData.thumbnail_url || null,
                is_active: formData.is_active,
                display_order: formData.display_order,
            };

            if (editingVideo) {
                const { error } = await supabase
                    .from("videos")
                    .update(videoData)
                    .eq("id", editingVideo.id);

                if (error) throw error;
                toast.success("Vidéo mise à jour !");
            } else {
                const { error } = await supabase
                    .from("videos")
                    .insert([videoData]);

                if (error) throw error;
                toast.success("Vidéo ajoutée !");
            }

            queryClient.invalidateQueries({ queryKey: ["videos-admin"] });
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error saving video:", error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const toggleActive = async (video: VideoItem) => {
        try {
            const { error } = await supabase
                .from("videos")
                .update({ is_active: !video.is_active })
                .eq("id", video.id);

            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["videos-admin"] });
            toast.success(video.is_active ? "Vidéo désactivée" : "Vidéo activée");
        } catch (error) {
            console.error("Error toggling video:", error);
            toast.error("Erreur lors de la modification");
        }
    };

    const deleteVideo = async (id: string, videoUrl: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) return;

        try {
            // Si c'est une vidéo uploadée sur Supabase Storage, la supprimer aussi
            if (videoUrl.includes("supabase.co/storage")) {
                const fileName = videoUrl.split("/").pop();
                if (fileName) {
                    await supabase.storage.from("videos").remove([fileName]);
                }
            }

            const { error } = await supabase.from("videos").delete().eq("id", id);

            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["videos-admin"] });
            toast.success("Vidéo supprimée");
        } catch (error) {
            console.error("Error deleting video:", error);
            toast.error("Erreur lors de la suppression");
        }
    };

    // Extraire l'ID YouTube d'une URL
    const getYouTubeId = (url: string) => {
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return match ? match[1] : null;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* En-tête avec bouton d'ajout */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Video className="w-5 h-5" /> Gestion des Vidéos
                    </h2>
                    <p className="text-sm text-gray-500">
                        Ajoutez des vidéos YouTube ou uploadez depuis votre PC (max 50 MB)
                    </p>
                </div>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) resetForm();
                    }}
                >
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="w-4 h-4 mr-2" /> Nouvelle vidéo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>
                                {editingVideo ? "Modifier la vidéo" : "Ajouter une vidéo"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Titre *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="Ex: Présentation Shake Off Phyto Fiber"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    placeholder="Décrivez la vidéo..."
                                />
                            </div>

                            {/* Onglets pour choisir URL ou Upload */}
                            {!editingVideo && (
                                <Tabs value={uploadTab} onValueChange={(v) => setUploadTab(v as "url" | "file")}>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="url" className="flex items-center gap-2">
                                            <Link className="w-4 h-4" /> Lien URL
                                        </TabsTrigger>
                                        <TabsTrigger value="file" className="flex items-center gap-2">
                                            <Upload className="w-4 h-4" /> Upload fichier
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="url" className="mt-4">
                                        <div>
                                            <Label htmlFor="video_url">URL de la vidéo</Label>
                                            <Input
                                                id="video_url"
                                                value={formData.video_url}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, video_url: e.target.value })
                                                }
                                                placeholder="https://www.youtube.com/watch?v=..."
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Collez le lien YouTube ou un lien direct
                                            </p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="file" className="mt-4">
                                        <div>
                                            <Label>Fichier vidéo</Label>
                                            <div
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                {selectedFile ? (
                                                    <div className="space-y-2">
                                                        <Video className="w-10 h-10 text-green-600 mx-auto" />
                                                        <p className="font-medium text-green-700">{selectedFile.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedFile(null);
                                                            }}
                                                        >
                                                            Changer de fichier
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <Upload className="w-10 h-10 text-gray-400 mx-auto" />
                                                        <p className="text-gray-600">Cliquez pour sélectionner une vidéo</p>
                                                        <p className="text-xs text-gray-500">MP4, MOV, AVI - Max 50 MB</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            )}

                            {/* Si on édite, afficher l'URL actuelle */}
                            {editingVideo && (
                                <div>
                                    <Label htmlFor="video_url">URL de la vidéo</Label>
                                    <Input
                                        id="video_url"
                                        value={formData.video_url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, video_url: e.target.value })
                                        }
                                        placeholder="https://..."
                                    />
                                </div>
                            )}

                            <div>
                                <Label htmlFor="thumbnail_url">URL de la miniature (optionnel)</Label>
                                <Input
                                    id="thumbnail_url"
                                    value={formData.thumbnail_url}
                                    onChange={(e) =>
                                        setFormData({ ...formData, thumbnail_url: e.target.value })
                                    }
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="display_order">Ordre d'affichage</Label>
                                    <Input
                                        id="display_order"
                                        type="number"
                                        min="0"
                                        value={formData.display_order}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                display_order: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-6">
                                    <Switch
                                        id="is_active"
                                        checked={formData.is_active}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, is_active: checked })
                                        }
                                    />
                                    <Label htmlFor="is_active">Vidéo active</Label>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    disabled={isUploading}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Upload en cours...
                                        </>
                                    ) : editingVideo ? (
                                        "Mettre à jour"
                                    ) : (
                                        "Ajouter"
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Liste des vidéos */}
            {!videos?.length ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune vidéo ajoutée</p>
                    <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                        <Plus className="w-4 h-4 mr-2" /> Ajouter ma première vidéo
                    </Button>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Aperçu</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Ordre</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {videos.map((video) => {
                                const youtubeId = getYouTubeId(video.video_url);
                                const isSupabaseVideo = video.video_url.includes("supabase.co/storage");
                                const thumbnail =
                                    video.thumbnail_url ||
                                    (youtubeId
                                        ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
                                        : null);

                                return (
                                    <TableRow
                                        key={video.id}
                                        className={!video.is_active ? "opacity-50" : ""}
                                    >
                                        <TableCell>
                                            {thumbnail ? (
                                                <img
                                                    src={thumbnail}
                                                    alt={video.title}
                                                    className="w-24 h-14 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-24 h-14 bg-gray-200 rounded flex items-center justify-center">
                                                    <Play className="w-6 h-6 text-gray-400" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{video.title}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {isSupabaseVideo ? (
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">📁 Upload</span>
                                                ) : youtubeId ? (
                                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">▶️ YouTube</span>
                                                ) : (
                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">🔗 URL</span>
                                                )}
                                                <a
                                                    href={video.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </TableCell>
                                        <TableCell>{video.display_order}</TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={video.is_active}
                                                onCheckedChange={() => toggleActive(video)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => openEditDialog(video)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => deleteVideo(video.id, video.video_url)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};
