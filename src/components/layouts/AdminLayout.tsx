import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No session found, redirecting to login");
        navigate("/login");
        return;
      }

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
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        {children}
      </div>
    </div>
  );
};