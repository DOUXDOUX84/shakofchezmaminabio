import { FormControl, FormField, FormItem, FormLabel, RadioGroup, RadioGroupItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const WAVE_PAYMENT_LINK = "https://pay.wave.com/m/M_MO1NT4Bhh6eN/c/sn/";

interface PaymentMethodSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  paymentMethod: z.enum(["orange", "wave"], {
    required_error: "Veuillez choisir une méthode de paiement",
  }),
});

export const PaymentMethodSection = ({ form }: PaymentMethodSectionProps) => {
  const paymentMethod = form.watch("paymentMethod");

  return (
    <>
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Méthode de paiement</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="orange" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Orange Money (+221776344286)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="wave" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Wave
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {paymentMethod === "wave" && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            Paiement Wave disponible via QR code ou lien direct :
          </p>
          <img 
            src="/lovable-uploads/b0e17f14-65a1-40cc-8f03-015f6a69d1a3.png" 
            alt="QR Code Wave"
            className="w-32 h-32 mx-auto mb-2"
          />
          <a 
            href={WAVE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline text-sm block text-center"
          >
            Cliquez ici pour payer avec Wave
          </a>
        </div>
      )}
    </>
  );
};