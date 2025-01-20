import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { toast } from "sonner";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to login");
          setIsAdmin(false);
          return;
        }

        console.log("Checking admin status for user:", session.user.id);
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          toast.error("Erreur lors de la vérification des droits d'accès");
          setIsAdmin(false);
          return;
        }

        console.log("User roles:", roles);
        if (roles?.role === 'admin') {
          setIsAdmin(true);
        } else {
          toast.error("Vous n'avez pas les droits d'accès administrateur");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error in checkAdmin:', error);
        toast.error("Une erreur est survenue lors de la vérification de vos droits");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (!session) {
        console.log("No session in auth state change");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log("Checking admin status on auth change for user:", session.user.id);
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role:', error);
          toast.error("Erreur lors de la vérification des droits d'accès");
          setIsAdmin(false);
          return;
        }

        console.log("User roles on auth change:", roles);
        if (roles?.role === 'admin') {
          setIsAdmin(true);
        } else {
          toast.error("Vous n'avez pas les droits d'accès administrateur");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        toast.error("Une erreur est survenue lors de la vérification de vos droits");
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    console.log("User is not admin, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;