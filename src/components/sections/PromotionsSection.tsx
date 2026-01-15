import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Tag, Clock, Percent } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

interface Promotion {
    id: string;
    title: string;
    description: string | null;
    discount_percentage: number | null;
    promo_code: string | null;
    image_url: string | null;
    is_active: boolean;
    start_date: string | null;
    end_date: string | null;
}

export const PromotionsSection = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);
    const { t, language } = useTranslation();

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const { data, error } = await supabase
                    .from("promotions")
                    .select("*")
                    .eq("is_active", true)
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching promotions:", error);
                    return;
                }

                // Filter active promos (within valid period)
                const now = new Date();
                const activePromos = (data || []).filter((promo) => {
                    if (promo.start_date && new Date(promo.start_date) > now) return false;
                    if (promo.end_date && new Date(promo.end_date) < now) return false;
                    return true;
                });

                setPromotions(activePromos);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();

        // Listen for real-time changes
        const channel = supabase
            .channel("promotions-changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "promotions" },
                () => {
                    fetchPromotions();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const scrollToOrder = () => {
        const orderSection = document.querySelector("#order-section");
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: "smooth" });
            // Attendre que le scroll soit terminé, puis cliquer sur le bouton du panier
            setTimeout(() => {
                const cartButton = orderSection.querySelector("button");
                if (cartButton) {
                    cartButton.click();
                }
            }, 500);
        }
    };

    if (loading || promotions.length === 0) {
        return null;
    }

    return (
        <section className="py-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            <div className="container mx-auto px-4">
                {promotions.map((promo, index) => (
                    <motion.div
                        key={promo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
                    >
                        {/* Promo image */}
                        {promo.image_url && (
                            <div className="w-full md:w-1/3">
                                <img
                                    src={promo.image_url}
                                    alt={promo.title}
                                    className="rounded-xl shadow-lg w-full object-cover"
                                />
                            </div>
                        )}

                        {/* Promo content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <Tag className="w-6 h-6 text-orange-500" />
                                <span className="text-orange-500 font-bold text-sm uppercase tracking-wide">
                                    {t("promotions.specialOffer")}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                {promo.title}
                            </h2>

                            {promo.description && (
                                <p className="text-gray-600 mb-4">{promo.description}</p>
                            )}

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                                {promo.discount_percentage && (
                                    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                                        <Percent className="w-5 h-5" />
                                        <span>-{promo.discount_percentage}% {t("promotions.discount")}</span>
                                    </div>
                                )}

                                {promo.promo_code && (
                                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg animate-pulse">
                                        💰 {parseInt(promo.promo_code).toLocaleString('fr-FR')} FCFA
                                    </div>
                                )}

                                {promo.end_date && (
                                    <div className="flex items-center gap-2 text-red-600 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {t("promotions.expires")}{" "}
                                            {new Date(promo.end_date).toLocaleDateString(
                                                language === "fr" ? "fr-FR" : "en-US"
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={scrollToOrder}
                                size="lg"
                                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all text-lg"
                            >
                                🛒 {t("promotions.ctaButton")} {promo.promo_code && `→ ${parseInt(promo.promo_code).toLocaleString('fr-FR')} FCFA`}
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
