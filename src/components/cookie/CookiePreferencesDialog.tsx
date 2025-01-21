import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CookieCheckboxGroup } from './CookieCheckboxGroup';

interface CookiePreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analyticsEnabled: boolean;
  marketingEnabled: boolean;
  onAnalyticsChange: (enabled: boolean) => void;
  onMarketingChange: (enabled: boolean) => void;
  onSave: () => void;
}

export const CookiePreferencesDialog = ({
  open,
  onOpenChange,
  analyticsEnabled,
  marketingEnabled,
  onAnalyticsChange,
  onMarketingChange,
  onSave
}: CookiePreferencesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Préférences des cookies</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <CookieCheckboxGroup
            id="essential"
            label="Cookies essentiels"
            description="Nécessaires au fonctionnement du site (panier, authentification, préférences)."
            checked={true}
            disabled={true}
          />
          
          <CookieCheckboxGroup
            id="analytics"
            label="Cookies analytiques"
            description="Pour analyser l'utilisation du site et améliorer nos services."
            checked={analyticsEnabled}
            onCheckedChange={onAnalyticsChange}
          />

          <CookieCheckboxGroup
            id="marketing"
            label="Cookies marketing"
            description="Pour personnaliser les publicités selon vos centres d'intérêt."
            checked={marketingEnabled}
            onCheckedChange={onMarketingChange}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            Enregistrer les préférences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};