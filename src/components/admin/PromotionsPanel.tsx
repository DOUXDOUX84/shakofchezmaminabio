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
import { Loader2, Plus, Trash2, Edit, Tag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface Promotion {
    id: string;
    title: string;
    description: string | null;
    discount_percentage: number | null;
    promo_code: string | null;
    image_url: string | null;
    is_active: boolean;
    start_date: string | null;
    end_date: string | null;
    created_at: string;
}

export const PromotionsPanel = () => {
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        discount_percentage: "",
        promo_code: "",
        image_url: "",
        is_active: true,
        end_date: "",
    });

    const { data: promotions, isLoading } = useQuery({
        queryKey: ["promotions-admin"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("promotions")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as Promotion[];
        },
    });

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            discount_percentage: "",
            promo_code: "",
            image_url: "",
            is_active: true,
            end_date: "",
        });
        setEditingPromo(null);
    };

    const openEditDialog = (promo: Promotion) => {
        setEditingPromo(promo);
        setFormData({
            title: promo.title,
            description: promo.description || "",
            discount_percentage: promo.discount_percentage?.toString() || "",
            promo_code: promo.promo_code || "",
            image_url: promo.image_url || "",
            is_active: promo.is_active,
            end_date: promo.end_date ? promo.end_date.split("T")[0] : "",
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const promoData = {
                title: formData.title,
                description: formData.description || null,
                discount_percentage: formData.discount_percentage ? parseInt(formData.discount_percentage) : null,
                promo_code: formData.promo_code || null,
                image_url: formData.image_url || null,
                is_active: formData.is_active,
                end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
            };

            if (editingPromo) {
                const { error } = await supabase
                    .from("promotions")
                    .update(promoData)
                    .eq("id", editingPromo.id);

                if (error) throw error;
                toast.success("Promotion mise à jour !");
            } else {
                const { error } = await supabase
                    .from("promotions")
                    .insert([promoData]);

                if (error) throw error;
                toast.success("Promotion créée !");
            }

            queryClient.invalidateQueries({ queryKey: ["promotions-admin"] });
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error saving promotion:", error);
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    const toggleActive = async (promo: Promotion) => {
        try {
            const { error } = await supabase
                .from("promotions")
                .update({ is_active: !promo.is_active })
                .eq("id", promo.id);

            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["promotions-admin"] });
            toast.success(promo.is_active ? "Promotion désactivée" : "Promotion activée");
        } catch (error) {
            console.error("Error toggling promotion:", error);
            toast.error("Erreur lors de la modification");
        }
    };

    const deletePromo = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette promotion ?")) return;

        try {
            const { error } = await supabase
                .from("promotions")
                .delete()
                .eq("id", id);

            if (error) throw error;
            queryClient.invalidateQueries({ queryKey: ["promotions-admin"] });
            toast.success("Promotion supprimée");
        } catch (error) {
            console.error("Error deleting promotion:", error);
            toast.error("Erreur lors de la suppression");
        }
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
                        <Tag className="w-5 h-5" /> Gestion des Promotions
                    </h2>
                    <p className="text-sm text-gray-500">
                        Créez et gérez vos offres promotionnelles
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="w-4 h-4 mr-2" /> Nouvelle promo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {editingPromo ? "Modifier la promotion" : "Nouvelle promotion"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Titre *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ex: 🎁 Offre de lancement !"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Décrivez votre offre..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="discount">Réduction (%)</Label>
                                    <Input
                                        id="discount"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.discount_percentage}
                                        onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                                        placeholder="Ex: 10"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="promo_code">Code promo</Label>
                                    <Input
                                        id="promo_code"
                                        value={formData.promo_code}
                                        onChange={(e) => setFormData({ ...formData, promo_code: e.target.value.toUpperCase() })}
                                        placeholder="Ex: PROMO10"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="end_date">Date de fin</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="image_url">URL de l'image (optionnel)</Label>
                                <Input
                                    id="image_url"
                                    type="url"
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    placeholder="https://exemple.com/image.jpg"
                                />
                                {formData.image_url && (
                                    <div className="mt-2">
                                        <img
                                            src={formData.image_url}
                                            alt="Aperçu"
                                            className="w-full h-32 object-cover rounded-lg border"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                />
                                <Label htmlFor="is_active">Promotion active</Label>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Annuler
                                </Button>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                    {editingPromo ? "Mettre à jour" : "Créer"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Liste des promotions */}
            {!promotions?.length ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune promotion créée</p>
                    <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                        <Plus className="w-4 h-4 mr-2" /> Créer ma première promo
                    </Button>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Réduction</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Date de fin</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {promotions.map((promo) => (
                                <TableRow key={promo.id} className={!promo.is_active ? "opacity-50" : ""}>
                                    <TableCell className="font-medium">{promo.title}</TableCell>
                                    <TableCell>
                                        {promo.discount_percentage ? `${promo.discount_percentage}%` : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {promo.promo_code ? (
                                            <code className="bg-yellow-100 px-2 py-1 rounded">{promo.promo_code}</code>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {promo.end_date
                                            ? new Date(promo.end_date).toLocaleDateString("fr-FR")
                                            : "Sans limite"}
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={promo.is_active}
                                            onCheckedChange={() => toggleActive(promo)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => openEditDialog(promo)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deletePromo(promo.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};
