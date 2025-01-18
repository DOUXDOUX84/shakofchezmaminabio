import { Phone, WhatsApp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const ContactButton = () => {
  const phoneNumber = "+221 77 777 77 77"; // Remplacez par votre numéro
  const whatsappLink = "https://wa.me/221777777777"; // Remplacez par votre lien WhatsApp

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Phone className="h-4 w-4" />
          Nous contacter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contactez-nous</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => window.location.href = `tel:${phoneNumber}`}
          >
            <Phone className="h-4 w-4" />
            {phoneNumber}
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <WhatsApp className="h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};