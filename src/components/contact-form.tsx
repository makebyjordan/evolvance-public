
"use client";

import { useActionState, useFormStatus } from 'react';
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendContactEmail } from '@/app/actions/contact-clients-action';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar Mensaje'}
    </Button>
  );
}

interface ContactFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ContactForm({ isOpen, setIsOpen }: ContactFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(sendContactEmail, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "¡Mensaje Enviado!",
          description: state.message,
        });
        formRef.current?.reset();
        setIsOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Error en el formulario",
          description: state.message,
        });
      }
    }
  }, [state, toast, setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Contacta con Nosotros</DialogTitle>
          <DialogDescription>
            Rellena el formulario y te responderemos lo antes posible.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" placeholder="Tu nombre completo" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" placeholder="Tu número de teléfono" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input id="subject" name="subject" placeholder="Asunto del mensaje" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" name="message" placeholder="Escribe tu consulta aquí..." rows={5} required />
            </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
