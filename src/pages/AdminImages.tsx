import { AdminLayout } from "@/components/layouts/AdminLayout";
import { ImageAdminPanel } from "@/components/admin/ImageAdminPanel";

const AdminImages = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Gestion des Images</h1>
      <ImageAdminPanel />
    </AdminLayout>
  );
};

export default AdminImages;