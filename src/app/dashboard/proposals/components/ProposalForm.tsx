
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
import { saveProposal, type Proposal } from "@/app/actions/proposals-actions";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(2, { message: "El título es requerido." }),
  code: z.string().min(2, { message: "El código es requerido." }),
  htmlText: z.string().min(10, { message: "El contenido es requerido." }),
});

type ProposalFormValues = z.infer<typeof formSchema>;

interface ProposalFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onFormSubmit: (updatedProposals: Proposal[]) => void;
  proposal: Proposal | null;
}

export function ProposalForm({ isOpen, setIsOpen, onFormSubmit, proposal }: ProposalFormProps) {
  const { toast } = useToast();
  const isEditing = !!proposal;

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      htmlText: "",
    },
  });

  useEffect(() => {
    if (isEditing && proposal) {
      form.reset({
        title: proposal.title,
        code: proposal.code,
        htmlText: proposal.htmlText,
      });
    } else {
      form.reset({
        title: "",
        code: "",
        htmlText: "",
      });
    }
  }, [isEditing, proposal, form]);


  const onSubmit = async (values: ProposalFormValues) => {
    const proposalData = {
      ...values,
      id: isEditing ? proposal.id : undefined,
    };
    
    const result = await saveProposal(proposalData);

    if (result.success && result.proposals) {
      toast({
        title: `Propuesta ${isEditing ? 'Actualizada' : 'Creada'}`,
        description: `La propuesta "${values.title}" ha sido guardada.`,
      });
      onFormSubmit(result.proposals);
      handleOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: `Error al ${isEditing ? 'actualizar' : 'crear'}`,
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
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{isEditing ? 'Editar Propuesta' : 'Nueva Propuesta'}</DialogTitle>
          <DialogDescription>
            Rellena los campos para {isEditing ? 'actualizar' : 'crear'} una propuesta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Propuesta de Desarrollo Web" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: PROP-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="htmlText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido HTML</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="Escribe el contenido de la propuesta aquí. Puedes usar HTML." {...field} />
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
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Propuesta')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
