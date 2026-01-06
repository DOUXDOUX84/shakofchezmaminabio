import { AdminLayout } from "@/components/layouts/AdminLayout";
import { PromotionsPanel } from "@/components/admin/PromotionsPanel";

const AdminPromotions = () => {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">🏷️ Gestion des Promotions</h1>
            <PromotionsPanel />
        </AdminLayout>
    );
};

export default AdminPromotions;
