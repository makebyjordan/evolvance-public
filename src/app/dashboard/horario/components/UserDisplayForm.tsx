
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { saveUserDisplay, type User, type UserStatus } from "@/app/actions/horario-actions";
import { useEffect } from "react";
import Image from "next/image";

const formSchema = z.object({
  imageUrl: z.string().url({ message: "Debe ser una URL válida." }).optional().or(z.literal('')),
  iconSvg: z.string().optional(),
});

type UserDisplayFormValues = z.infer<typeof formSchema>;

interface UserDisplayFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
  initialData: UserStatus | null;
}

export function UserDisplayForm({ isOpen, setIsOpen, user, initialData }: UserDisplayFormProps) {
  const { toast } = useToast();

  const form = useForm<UserDisplayFormValues>({
    resolver: zodResolver(formSchema),
  });

  const imageUrl = form.watch('imageUrl');

  useEffect(() => {
    if (initialData) {
      form.reset({
        imageUrl: initialData.imageUrl || "",
        iconSvg: initialData.iconSvg || "",
      });
    } else {
      form.reset({
        imageUrl: "",
        iconSvg: "",
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: UserDisplayFormValues) => {
    if (!user) return;

    const result = await saveUserDisplay({
        id: user,
        ...values
    });

    if (result.success) {
      toast({
        title: "Apariencia Actualizada",
        description: `La apariencia para ${user} ha sido guardada.`,
      });
      handleOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: result.error || 'Ocurrió un error desconocido.',
      });
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Editar Apariencia de <span className="capitalize">{user}</span></DialogTitle>
          <DialogDescription>
            Añade una URL de imagen o un código SVG para el icono.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/imagen.png" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            {imageUrl && (
              <div className="w-full aspect-square relative rounded-full overflow-hidden bg-muted mx-auto max-w-48">
                 <Image src={imageUrl} alt="Vista previa" fill className="object-cover" />
              </div>
            )}

            <div className="relative flex items-center">
                <div className="flex-grow border-t border-muted"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-xs">O</span>
                <div className="flex-grow border-t border-muted"></div>
            </div>

            <FormField
              control={form.control}
              name="iconSvg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icono (código SVG)</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="<svg>...</svg>" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
