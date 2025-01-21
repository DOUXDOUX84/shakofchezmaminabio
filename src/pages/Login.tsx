import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { AuthError } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roles?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN') {
        if (session) {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          console.log("User roles:", roles);

          if (roles?.role === 'admin') {
            navigate('/admin');
          } else {
            setErrorMessage("Vous n'avez pas les droits d'accès administrateur.");
            await supabase.auth.signOut();
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        setErrorMessage(getErrorMessage(error));
        return;
      }

      if (!data.user) {
        setErrorMessage("Une erreur est survenue lors de la connexion.");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .single();

      if (roles?.role !== 'admin') {
        setErrorMessage("Vous n'avez pas les droits d'accès administrateur.");
        await supabase.auth.signOut();
        return;
      }

      navigate('/admin');
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Identifiants invalides. Veuillez vérifier votre email et mot de passe.';
      case 'Email not confirmed':
        return 'Veuillez vérifier votre adresse email avant de vous connecter.';
      case 'User already registered':
        return 'Cette adresse email est déjà utilisée.';
      default:
        return 'Une erreur est survenue lors de la connexion.';
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login',
      });
      
      if (error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="w-full p-2 border rounded"
                onChange={(e) => setErrorMessage("")}
              />
              <div className="flex space-x-2">
                <Button 
                  onClick={() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    handleResetPassword(emailInput?.value || '');
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                </Button>
                <Button 
                  onClick={() => setShowResetPassword(false)}
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                >
                  Retour
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#16a34a',
                    brandAccent: '#15803d',
                  }
                }
              }
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion en cours...',
                },
                sign_up: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Créer un compte',
                  loading_button_label: 'Création en cours...',
                  link_text: '',
                }
              }
            }}
            providers={[]}
            magicLink={false}
            onlyThirdPartyProviders={false}
            view="sign_in"
          />
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