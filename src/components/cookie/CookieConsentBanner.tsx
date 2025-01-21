import { useState } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { CookiePreferencesDialog } from './CookiePreferencesDialog';

export const CookieConsentBanner = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  const handleAcceptAll = () => {
    Cookies.set('essential', 'true', { expires: 365 });
    Cookies.set('analytics', 'true', { expires: 365 });
    Cookies.set('marketing', 'true', { expires: 365 });
    
    if (analyticsEnabled) {
      console.log('Google Analytics initialized');
    }

    if (marketingEnabled) {
      console.log('Marketing cookies initialized');
    }
  };

  const handleSavePreferences = () => {
    Cookies.set('essential', 'true', { expires: 365 });
    Cookies.set('analytics', analyticsEnabled.toString(), { expires: 365 });
    Cookies.set('marketing', marketingEnabled.toString(), { expires: 365 });
    
    setShowPreferences(false);

    if (analyticsEnabled) {
      console.log('Google Analytics initialized');
    }

    if (marketingEnabled) {
      console.log('Marketing cookies initialized');
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

      <CookiePreferencesDialog
        open={showPreferences}
        onOpenChange={setShowPreferences}
        analyticsEnabled={analyticsEnabled}
        marketingEnabled={marketingEnabled}
        onAnalyticsChange={setAnalyticsEnabled}
        onMarketingChange={setMarketingEnabled}
        onSave={handleSavePreferences}
      />
    </>
  );
};