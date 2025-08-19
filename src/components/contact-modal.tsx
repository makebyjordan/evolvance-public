"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  company: z.string().min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres." }),
});

async function submitForm(data: z.infer<typeof formSchema>) {
  console.log("Form submitted:", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "¡Gracias! Nos pondremos en contacto contigo pronto." };
}

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await submitForm(values);
    if (result.success) {
      toast({
        title: "Solicitud Enviada",
        description: result.message,
      });
      form.reset();
      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Agendar Sesión Estratégica</DialogTitle>
          <DialogDescription>
            Completa el formulario y nos pondremos en contacto para agendar tu sesión gratuita.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de tu empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
