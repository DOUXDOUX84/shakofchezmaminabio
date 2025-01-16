import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { supabase } from './lib/supabase';
import { useEffect } from "react";
import { useToast } from "./components/ui/use-toast";

const queryClient = new QueryClient();

const App = () => {
  const { toast } = useToast();

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('images').select('*').limit(1);
        if (error) throw error;
        console.log('Connexion à Supabase réussie !');
        toast({
          title: "Connexion réussie",
          description: "La connexion à Supabase est établie.",
        });
      } catch (error) {
        console.error('Erreur de connexion à Supabase:', error);
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Impossible de se connecter à Supabase. Vérifiez votre configuration.",
        });
      }
    };

    testConnection();
  }, [toast]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;