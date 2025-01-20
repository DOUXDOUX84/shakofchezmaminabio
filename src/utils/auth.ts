import type { AuthError } from "@supabase/supabase-js";

export const getErrorMessage = (error: AuthError) => {
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