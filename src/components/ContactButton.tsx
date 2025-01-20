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
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white border-[#0EA5E9] shadow-lg transform transition-all duration-300 hover:scale-105 font-semibold px-6 py-4 rounded-lg text-lg"
        >
          <Phone className="h-4 w-4 mr-2" />
          Nous contacter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#0EA5E9]">Contactez-nous</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="justify-start gap-2 hover:bg-[#F1F0FB] hover:text-[#0EA5E9] transition-all duration-300 transform hover:scale-105"
            onClick={() => window.location.href = `tel:${phoneNumber}`}
          >
            <Phone className="h-4 w-4" />
            {phoneNumber}
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2 hover:bg-[#F1F0FB] hover:text-[#0EA5E9] transition-all duration-300 transform hover:scale-105"
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