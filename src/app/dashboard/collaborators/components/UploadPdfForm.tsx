
"use client";

import { useRef, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { uploadContractPdf } from "@/app/actions/collaborators-actions";
import type { Collaborator } from "@/app/actions/collaborators-actions";
import { Loader2 } from "lucide-react";

interface UploadPdfFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  collaborator: Collaborator | null;
}

export function UploadPdfForm({ isOpen, setIsOpen, collaborator }: UploadPdfFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!collaborator) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await uploadContractPdf(collaborator.id, formData);

    if (result.success) {
      toast({
        title: "Archivo Subido",
        description: "El contrato en PDF se ha guardado correctamente.",
      });
      handleOpenChange(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error al subir",
        description: result.error || 'Ocurrió un error desconocido.',
      });
    }
    setIsSubmitting(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      formRef.current?.reset();
      setFileName('');
    }
    setIsOpen(open);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Subir Contrato en PDF</DialogTitle>
          <DialogDescription>
            Selecciona el archivo PDF del contrato para <span className="font-bold">{collaborator?.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="pdf-file">Archivo PDF</Label>
                <Input id="pdf-file" name="pdf-file" type="file" accept="application/pdf" required onChange={handleFileChange}/>
                {fileName && <p className="text-sm text-muted-foreground mt-2">Archivo seleccionado: {fileName}</p>}
            </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...</> : 'Subir Archivo'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
