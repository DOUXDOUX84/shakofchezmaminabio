import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";

const languages = [
    { code: "fr" as const, label: "Français", flag: "🇫🇷" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
];

export const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                >
                    <span className="text-lg">{currentLang.flag}</span>
                    <span className="hidden sm:inline font-medium">{currentLang.code.toUpperCase()}</span>
                    <Globe className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`flex items-center justify-between cursor-pointer ${language === lang.code ? "bg-green-50 text-green-700" : ""
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.label}</span>
                        </div>
                        {language === lang.code && <Check className="w-4 h-4 text-green-600" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
