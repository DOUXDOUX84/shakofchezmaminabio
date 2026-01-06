import { AdminLayout } from "@/components/layouts/AdminLayout";
import { VideosPanel } from "@/components/admin/VideosPanel";

const AdminVideos = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">🎬 Gestion des Vidéos</h1>
            <VideosPanel />
        </AdminLayout>
    );
};

export default AdminVideos;
