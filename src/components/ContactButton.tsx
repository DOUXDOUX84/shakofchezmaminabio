import { Phone, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const fetchContactInfo = async () => {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .maybeSingle();
  
  if (error) throw error;
  return data;
};

export const ContactButton = () => {
  const { data: contactInfo, isLoading } = useQuery({
    queryKey: ['contactInfo'],
    queryFn: fetchContactInfo,
  });

  const phoneNumber = contactInfo?.phone_number || "+221 77 777 77 77"; // Fallback value
  const whatsappLink = contactInfo?.whatsapp_link || "https://wa.me/221777777777"; // Fallback value

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8B5CF6] hover:to-[#7E69AB] text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6"
        >
          <Phone className="h-4 w-4" />
          Nous contacter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#7E69AB]">Contactez-nous</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="justify-start gap-2 hover:bg-[#F1F0FB] hover:text-[#7E69AB] transition-colors"
            onClick={() => window.location.href = `tel:${phoneNumber}`}
          >
            <Phone className="h-4 w-4" />
            {phoneNumber}
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2 hover:bg-[#F1F0FB] hover:text-[#7E69AB] transition-colors"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};