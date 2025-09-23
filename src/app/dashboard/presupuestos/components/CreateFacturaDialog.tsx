
"use client";

import { useState } from "react";
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
import { createFacturaFromPresupuesto, type Presupuesto } from "@/app/actions/presupuestos-actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CreateFacturaDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  presupuesto: Presupuesto | null;
}

export function CreateFacturaDialog({ isOpen, setIsOpen, presupuesto }: CreateFacturaDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [percentage, setPercentage] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateFactura = async () => {
    if (!presupuesto) return;
    setIsSubmitting(true);
    
    const result = await createFacturaFromPresupuesto(presupuesto.id, percentage);
    
    if (result.success) {
      toast({
        title: "Factura Creada",
        description: `Se ha creado una factura por el ${percentage}% del presupuesto.`,
      });
      setIsOpen(false);
      router.push('/dashboard/facturas');
    } else {
      toast({
        variant: "destructive",
        title: "Error al crear factura",
        description: result.error || "Ocurrió un error desconocido.",
      });
    }
    setIsSubmitting(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPercentage(100);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">Crear Factura desde Presupuesto</DialogTitle>
          <DialogDescription>
            Indica qué porcentaje del presupuesto "{presupuesto?.presupuestoNumber}" quieres facturar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="percentage" className="text-right">
                    Porcentaje (%)
                </Label>
                <Input
                    id="percentage"
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="col-span-3"
                    min="1"
                    max="100"
                />
            </div>
             <div className="text-right font-bold text-lg">
                Total a facturar: {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format((presupuesto?.total || 0) * (percentage / 100))}
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleCreateFactura} disabled={isSubmitting}>
            {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando...</> : 'Crear Factura'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
