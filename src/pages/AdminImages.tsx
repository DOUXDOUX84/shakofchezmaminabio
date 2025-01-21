import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ImagesTable } from "@/components/admin/ImagesTable";

const AdminImages = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Gestion des Images</h1>
      <ImagesTable />
    </AdminLayout>
  );
};

export default AdminImages;