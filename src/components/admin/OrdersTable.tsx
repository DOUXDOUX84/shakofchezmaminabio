import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, ExternalLink, MapPin, Phone, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  payment_pending_verification: "bg-orange-500",
  paid: "bg-blue-500",
  completed: "bg-green-500",
  shipped: "bg-purple-500",
  cancelled: "bg-red-500",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  payment_pending_verification: "Paiement à vérifier",
  paid: "Payé",
  completed: "Complété",
  shipped: "Expédié",
  cancelled: "Annulé",
};

interface Order {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  quantity: number;
  total_price: number;
  payment_method: string;
  status: string;
  payment_proof_url: string | null;
  created_at: string;
  updated_at: string;
}

export const OrdersTable = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
  });

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;

      // Rafraîchir les données
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Statut mis à jour avec succès");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Une erreur est survenue lors du chargement des commandes
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-xl mb-2">📦 Aucune commande trouvée</p>
        <p className="text-sm">Les commandes apparaîtront ici quand des clients commanderont.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'pending' || o.status === 'payment_pending_verification').length}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-sm text-blue-800">Payées</p>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'paid').length}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-sm text-green-800">Complétées</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'completed' || o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-sm text-purple-800">Total commandes</p>
          <p className="text-2xl font-bold text-purple-600">{orders.length}</p>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Commande</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Preuve</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className={order.status === 'payment_pending_verification' ? 'bg-orange-50' : ''}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(order.created_at), "dd MMM yyyy", { locale: fr })}
                  <br />
                  <span className="text-xs text-gray-500">
                    {format(new Date(order.created_at), "HH:mm")}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="font-medium">{order.full_name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <a href={`tel:${order.phone}`} className="text-blue-600 hover:underline">
                        {order.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="text-xs">{order.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{order.quantity} boîte(s)</div>
                    <div className="text-green-600 font-bold">
                      {order.total_price.toLocaleString()} FCFA
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {order.payment_method === 'orange' ? '🟠 Orange Money' : '🔵 Wave'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.payment_proof_url ? (
                    <a
                      href={order.payment_proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-600 hover:text-green-800"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Voir</span>
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Non reçue</span>
                  )}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue>
                        <Badge className={statusColors[order.status] || 'bg-gray-500'}>
                          {statusLabels[order.status] || order.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">⏳ En attente</SelectItem>
                      <SelectItem value="payment_pending_verification">🔍 Paiement à vérifier</SelectItem>
                      <SelectItem value="paid">💳 Payé</SelectItem>
                      <SelectItem value="shipped">🚚 Expédié</SelectItem>
                      <SelectItem value="completed">✅ Complété</SelectItem>
                      <SelectItem value="cancelled">❌ Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-1" /> Détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Détails de la commande</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" /> Client
                          </h4>
                          <p className="text-lg font-medium">{order.full_name}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4" /> Adresse de livraison
                          </h4>
                          <p className="text-lg">{order.address}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4" /> Contact
                          </h4>
                          <p>📱 {order.phone}</p>
                          <p>📧 {order.email}</p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">💰 Commande</h4>
                          <p>{order.quantity} boîte(s) × 25,800 FCFA</p>
                          <p className="text-2xl font-bold text-green-600">
                            Total: {order.total_price.toLocaleString()} FCFA
                          </p>
                        </div>

                        {order.payment_proof_url && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">📄 Preuve de paiement</h4>
                            <a
                              href={order.payment_proof_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Ouvrir la preuve
                            </a>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};