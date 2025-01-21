import { AdminLayout } from "@/components/layouts/AdminLayout";
import { OrdersTable } from "@/components/admin/OrdersTable";

const Admin = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Gestion des Commandes</h1>
      <OrdersTable />
    </AdminLayout>
  );
};

export default Admin;