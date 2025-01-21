import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ResetPasswordFormProps {
  onBack: () => void;
  onError: (message: string) => void;
}

export const ResetPasswordForm = ({ onBack, onError }: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetPassword = async (emailInput: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(emailInput, {
        redirectTo: window.location.origin + '/login',
      });
      
      if (error) {
        onError(error.message);
      } else {
        onError("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
      </p>
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            onError("");
          }}
          className="w-full"
        />
        <div className="flex space-x-2">
          <Button 
            onClick={() => handleResetPassword(email)}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </Button>
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
};