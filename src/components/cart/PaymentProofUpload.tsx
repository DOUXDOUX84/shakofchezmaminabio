import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

interface PaymentProofUploadProps {
    orderId: string;
    paymentMethod: "orange" | "wave";
    totalPrice: number;
    onSuccess: () => void;
    onClose: () => void;
}

const ORANGE_MONEY_NUMBER = "+221 77 634 42 86";
const WAVE_LINK = "https://pay.wave.com/m/M_MO1NT4Bhh6eN/c/sn/";

export const PaymentProofUpload = ({
    orderId,
    paymentMethod,
    totalPrice,
    onSuccess,
    onClose,
}: PaymentProofUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const { t, language } = useTranslation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Check size (max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast({
                    title: language === "fr" ? "Fichier trop volumineux" : "File too large",
                    description: t("payment.fileTooLarge"),
                    variant: "destructive",
                });
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast({
                title: language === "fr" ? "Aucun fichier sélectionné" : "No file selected",
                description: t("payment.noFileSelected"),
                variant: "destructive",
            });
            return;
        }

        try {
            setIsUploading(true);

            // Create unique filename
            const fileExt = file.name.split(".").pop();
            const fileName = `${orderId}_${Date.now()}.${fileExt}`;

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("payment-proofs")
                .upload(fileName, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw uploadError;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from("payment-proofs")
                .getPublicUrl(fileName);

            // Update order with proof URL
            const { error: updateError } = await supabase
                .from("orders")
                .update({
                    payment_proof_url: urlData.publicUrl,
                    status: "payment_pending_verification",
                })
                .eq("id", orderId);

            if (updateError) {
                console.error("Update error:", updateError);
                throw updateError;
            }

            setIsUploaded(true);
            toast({
                title: `✅ ${t("payment.proofSent")}`,
                description: t("payment.proofSentMessage"),
                duration: 10000,
            });

            setTimeout(() => {
                onSuccess();
            }, 2000);
        } catch (error) {
            console.error("Error uploading proof:", error);
            toast({
                title: language === "fr" ? "Erreur d'envoi" : "Upload error",
                description: language === "fr"
                    ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer."
                    : "An error occurred during upload. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    if (isUploaded) {
        return (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
                <h3 className="text-xl font-bold text-green-800">
                    {t("payment.proofSent")}
                </h3>
                <p className="text-center text-gray-600">
                    {t("payment.proofSentMessage")}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6 py-4">
            {/* Payment instructions */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">
                    📱 {t("payment.title")}
                </h3>

                {paymentMethod === "orange" ? (
                    <div className="space-y-2">
                        <p className="text-green-700">
                            1. {t("payment.openApp")} <strong>Orange Money</strong>
                        </p>
                        <p className="text-green-700">
                            2. {t("payment.sendAmount")}{" "}
                            <strong className="text-xl">
                                {totalPrice.toLocaleString()} FCFA
                            </strong>
                        </p>
                        <p className="text-green-700">
                            3. {t("payment.toNumber")}:{" "}
                            <strong className="text-lg">{ORANGE_MONEY_NUMBER}</strong>
                        </p>
                        <p className="text-green-700">
                            4. {t("payment.takeScreenshot")}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-green-700">
                            1. {t("payment.clickToPay")} <strong>Wave</strong>
                        </p>
                        <Button
                            onClick={() => window.open(WAVE_LINK, "_blank")}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            💳 {t("payment.payWith")} Wave
                        </Button>
                        <p className="text-green-700 mt-2">
                            2. {t("payment.takeScreenshot")}
                        </p>
                    </div>
                )}
            </div>

            {/* Upload zone */}
            <div className="space-y-3">
                <Label htmlFor="payment-proof" className="text-lg font-semibold">
                    📤 {t("payment.uploadProof")}
                </Label>
                <p className="text-sm text-gray-600">
                    {t("payment.uploadDescription")}
                </p>

                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <Input
                        id="payment-proof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="payment-proof"
                        className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                        <Upload className="w-10 h-10 text-green-600" />
                        <span className="text-green-700 font-medium">
                            {file ? file.name : t("payment.selectFile")}
                        </span>
                        <span className="text-sm text-gray-500">
                            {t("payment.fileTypes")}
                        </span>
                    </label>
                </div>

                {file && (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <span className="text-green-700 truncate">{file.name}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </Button>
                    </div>
                )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
                <Button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {t("payment.uploading")}
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" />
                            {t("payment.sendProof")}
                        </>
                    )}
                </Button>
                <Button variant="outline" onClick={onClose}>
                    {t("payment.laterButton")}
                </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
                {t("payment.whatsappNote")}
            </p>
        </div>
    );
};
