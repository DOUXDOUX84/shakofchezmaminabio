import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import frTranslations from "./fr.json";
import enTranslations from "./en.json";

type Language = "fr" | "en";

type TranslationKeys = typeof frTranslations;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    translations: TranslationKeys;
}

const translations = {
    fr: frTranslations,
    en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Vérifier le localStorage
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("language");
            if (saved === "fr" || saved === "en") {
                return saved;
            }
            // Détecter la langue du navigateur
            const browserLang = navigator.language.split("-")[0];
            if (browserLang === "en") {
                return "en";
            }
        }
        return "fr"; // Français par défaut
    });

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
        // Mettre à jour l'attribut lang du HTML
        document.documentElement.lang = lang;
    };

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    // Fonction pour obtenir une traduction par clé (ex: "hero.title")
    const t = (key: string): string => {
        const keys = key.split(".");
        let value: unknown = translations[language];

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return typeof value === "string" ? value : key;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
                translations: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

// Hook simple pour les traductions
export const useTranslation = () => {
    const { t, language } = useLanguage();
    return { t, language };
};
