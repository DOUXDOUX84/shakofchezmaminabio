import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const Admin = () => {
  const { data: orders, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      console.log("Fetching orders...");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }

      console.log("Orders fetched successfully:", data);
      return data;
    },
  });

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      console.log(`Updating order ${orderId} status to ${newStatus}`);
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) {
        console.error("Error updating order status:", error);
        throw error;
      }

      await refetch();
      toast.success("Statut de la commande mis à jour");
    } catch (error) {
      console.error("Error in updateOrderStatus:", error);
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-red-500">
          Erreur lors du chargement des commandes: {(error as Error).message}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Gestion des Commandes</h1>
        <div className="text-center py-8">
          Aucune commande n'a été trouvée.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Gestion des Commandes</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Quantité</TableHead>
              <TableHead>Prix Total</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{order.full_name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.total_price} FCFA</TableCell>
                <TableCell>{order.payment_method}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue>
                        <Badge
                          className={`${
                            statusColors[order.status as keyof typeof statusColors]
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="completed">Complété</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;