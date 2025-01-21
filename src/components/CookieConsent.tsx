import { useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const CookieConsentBanner = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  const handleAcceptAll = () => {
    // Définir tous les cookies
    Cookies.set('essential', 'true', { expires: 365 });
    Cookies.set('analytics', 'true', { expires: 365 });
    Cookies.set('marketing', 'true', { expires: 365 });
    
    // Initialiser Google Analytics si accepté
    if (analyticsEnabled) {
      console.log('Google Analytics initialized');
      // Code d'initialisation de GA ici
    }

    // Initialiser les cookies marketing si acceptés
    if (marketingEnabled) {
      console.log('Marketing cookies initialized');
      // Code d'initialisation des pixels marketing ici
    }
  };

  const handleSavePreferences = () => {
    Cookies.set('essential', 'true', { expires: 365 }); // Toujours activé
    Cookies.set('analytics', analyticsEnabled.toString(), { expires: 365 });
    Cookies.set('marketing', marketingEnabled.toString(), { expires: 365 });
    
    setShowPreferences(false);

    if (analyticsEnabled) {
      console.log('Google Analytics initialized');
      // Code d'initialisation de GA ici
    }

    if (marketingEnabled) {
      console.log('Marketing cookies initialized');
      // Code d'initialisation des pixels marketing ici
    }
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accepter tout"
        declineButtonText="Paramètres"
        onAccept={handleAcceptAll}
        onDecline={() => setShowPreferences(true)}
        style={{ 
          background: '#2B373B',
          zIndex: 10,
          position: 'fixed',
          bottom: 0,
          padding: '6px 12px',
          width: '100%',
          left: 0,
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '12px'
        }}
        buttonStyle={{ 
          background: '#4CAF50',
          color: 'white',
          fontSize: '12px',
          borderRadius: '3px',
          padding: '4px 12px',
          margin: '0 4px',
          whiteSpace: 'nowrap'
        }}
        declineButtonStyle={{
          background: 'transparent',
          border: '1px solid white',
          color: 'white',
          fontSize: '12px',
          borderRadius: '3px',
          padding: '4px 12px',
          margin: '0 4px',
          whiteSpace: 'nowrap'
        }}
        containerClasses="cookie-consent-container"
        contentStyle={{
          flex: '1',
          margin: '0',
          padding: '0',
          fontSize: '12px',
          lineHeight: '1.3'
        }}
      >
        <p className="text-xs m-0">
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
          Les cookies essentiels sont nécessaires au bon fonctionnement du site. 
          <a 
            href="/privacy-policy" 
            className="text-blue-400 hover:text-blue-300 underline ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus
          </a>
        </p>
      </CookieConsent>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Préférences des cookies</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-4">
              <Checkbox 
                id="essential" 
                checked={true} 
                disabled={true}
              />
              <div className="space-y-1">
                <Label htmlFor="essential" className="font-medium">
                  Cookies essentiels
                </Label>
                <p className="text-sm text-gray-500">
                  Nécessaires au fonctionnement du site (panier, authentification, préférences).
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Checkbox 
                id="analytics" 
                checked={analyticsEnabled}
                onCheckedChange={(checked) => setAnalyticsEnabled(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="analytics" className="font-medium">
                  Cookies analytiques
                </Label>
                <p className="text-sm text-gray-500">
                  Pour analyser l'utilisation du site et améliorer nos services.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Checkbox 
                id="marketing" 
                checked={marketingEnabled}
                onCheckedChange={(checked) => setMarketingEnabled(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="marketing" className="font-medium">
                  Cookies marketing
                </Label>
                <p className="text-sm text-gray-500">
                  Pour personnaliser les publicités selon vos centres d'intérêt.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Annuler
            </Button>
            <Button onClick={handleSavePreferences}>
              Enregistrer les préférences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};