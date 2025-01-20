import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const LoginForm = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: '#16a34a',
              brandAccent: '#15803d',
            },
            borderWidths: {
              buttonBorderWidth: '0px',
            },
            radii: {
              borderRadiusButton: '6px',
            },
          }
        },
        className: {
          button: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors',
          input: 'rounded-md border border-input px-3 py-2 text-sm',
          label: 'text-sm font-medium text-gray-700',
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
  );
};