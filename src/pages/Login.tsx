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
      if (event === 'SIGNED_IN') {
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
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Identifiants invalides. Veuillez vérifier votre email et mot de passe.';
      case 'Email not confirmed':
        return 'Veuillez vérifier votre adresse email avant de vous connecter.';
      case 'User already registered':
        return 'Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse email.';
      default:
        return error.message;
    }
  };

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail('', {
      redirectTo: window.location.origin + '/login',
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.");
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
                  onClick={handleResetPassword}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Envoyer le lien
                </Button>
                <Button 
                  onClick={() => setShowResetPassword(false)}
                  variant="outline"
                  className="w-full"
                >
                  Retour
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                    link_text: 'Pas encore de compte ? Inscrivez-vous',
                  }
                }
              }}
              providers={[]}
              magicLink={false}
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
            />
            <Button
              onClick={() => setShowResetPassword(true)}
              variant="link"
              className="w-full mt-4 text-green-600 hover:text-green-700"
            >
              Mot de passe oublié ?
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;