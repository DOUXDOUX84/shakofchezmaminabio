import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShoppingCart, Image, Tag, LogOut, Home, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/admin", label: "Commandes", icon: ShoppingCart },
  { path: "/admin/images", label: "Images", icon: Image },
  { path: "/admin/videos", label: "Vidéos", icon: Video },
  { path: "/admin/promotions", label: "Promotions", icon: Tag },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          console.log("No session found, redirecting to login");
          navigate("/login");
          return;
        }

        setUserEmail(session.user.email || null);

        const { data: roles, error } = await supabase
          .from("user_roles")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (error || !roles) {
          console.error("Error or no admin role found:", error);
          toast.error("Accès non autorisé");
          navigate("/login");
          return;
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/login");
      }
    };

    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                <Home className="w-5 h-5" />
                <span className="font-bold text-lg hidden sm:inline">CHEZMAMINABIO</span>
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">Panel Admin</span>
            </div>
            <div className="flex items-center gap-4">
              {userEmail && (
                <span className="text-sm text-gray-500 hidden md:inline">
                  👤 {userEmail}
                </span>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${isActive
                    ? "border-green-600 text-green-600 bg-green-50"
                    : "border-transparent text-gray-600 hover:text-green-600 hover:bg-gray-50"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500">
          Panel d'administration CHEZMAMINABIO © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};