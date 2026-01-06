import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/i18n/LanguageContext";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true as these are required
    analytics: false,
    marketing: false,
  });
  const { language } = useTranslation();

  // Translations
  const texts = language === "fr" ? {
    mainText: "Nous utilisons des cookies pour améliorer votre expérience.",
    managePrefs: "Gérer mes préférences",
    prefsTitle: "Préférences des cookies",
    essential: "Cookies essentiels",
    essentialDesc: "Nécessaires au fonctionnement du site",
    analytics: "Cookies analytiques",
    analyticsDesc: "Analyse du trafic et des performances",
    marketing: "Cookies marketing",
    marketingDesc: "Personnalisation publicitaire",
    savePrefs: "Enregistrer mes préférences",
    rejectAll: "Tout refuser",
    acceptAll: "Tout accepter"
  } : {
    mainText: "We use cookies to improve your experience.",
    managePrefs: "Manage my preferences",
    prefsTitle: "Cookie Preferences",
    essential: "Essential cookies",
    essentialDesc: "Required for the site to function",
    analytics: "Analytics cookies",
    analyticsDesc: "Traffic and performance analysis",
    marketing: "Marketing cookies",
    marketingDesc: "Advertising personalization",
    savePrefs: "Save my preferences",
    rejectAll: "Reject all",
    acceptAll: "Accept all"
  };

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    localStorage.setItem("cookieConsent", JSON.stringify(newPreferences));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    localStorage.setItem("cookieConsent", JSON.stringify(newPreferences));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <p className="text-gray-600 mr-4 flex-1">
          {texts.mainText}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="px-1 h-auto">
                {texts.managePrefs}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{texts.prefsTitle}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">{texts.essential}</Label>
                    <p className="text-sm text-gray-500">{texts.essentialDesc}</p>
                  </div>
                  <Switch checked disabled />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">{texts.analytics}</Label>
                    <p className="text-sm text-gray-500">{texts.analyticsDesc}</p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({ ...prev, analytics: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">{texts.marketing}</Label>
                    <p className="text-sm text-gray-500">{texts.marketingDesc}</p>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({ ...prev, marketing: checked }))
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSavePreferences}>
                  {texts.savePrefs}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </p>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRejectAll}
            className="text-xs"
          >
            {texts.rejectAll}
          </Button>
          <Button
            size="sm"
            onClick={handleAcceptAll}
            className="bg-green-500 hover:bg-green-600 text-xs"
          >
            {texts.acceptAll}
          </Button>
        </div>
      </div>
    </div>
  );
};