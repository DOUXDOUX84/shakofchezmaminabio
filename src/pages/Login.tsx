import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LoginForm } from "@/components/auth/LoginForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { getErrorMessage } from "@/utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error("Error fetching user role:", error);
            setErrorMessage("Erreur lors de la vérification des droits d'accès.");
            await supabase.auth.signOut();
            return;
          }

          console.log("User roles:", roles);

          if (roles?.role === 'admin') {
            navigate('/admin');
          } else {
            setErrorMessage("Vous n'avez pas les droits d'accès administrateur.");
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setErrorMessage("Une erreur est survenue lors de la vérification de vos droits.");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN' && session) {
        try {
          setIsLoading(true);
          const { data: roles, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            console.error("Error fetching user role:", error);
            setErrorMessage("Erreur lors de la vérification des droits d'accès.");
            await supabase.auth.signOut();
            return;
          }

          console.log("User roles:", roles);

          if (roles?.role === 'admin') {
            navigate('/admin');
          } else {
            setErrorMessage("Vous n'avez pas les droits d'accès administrateur.");
            await supabase.auth.signOut();
          }
        } catch (error) {
          console.error("Error during auth state change:", error);
          setErrorMessage("Une erreur est survenue lors de la vérification de vos droits.");
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 via-white to-yellow-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">
          Connexion Administrateur
        </h1>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        {showResetPassword ? (
          <ResetPasswordForm 
            onBack={() => setShowResetPassword(false)}
            onError={setErrorMessage}
          />
        ) : (
          <LoginForm />
        )}
        <Button
          onClick={() => setShowResetPassword(true)}
          variant="link"
          className="w-full mt-4 text-green-600 hover:text-green-700"
          disabled={isLoading}
        >
          Mot de passe oublié ?
        </Button>
      </div>
    </div>
  );
};

export default Login;