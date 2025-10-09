
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Protocol } from "@/app/actions/protocols-actions";

interface ProtocolViewDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  protocol: Protocol | null;
}

export function ProtocolViewDialog({ isOpen, setIsOpen, protocol }: ProtocolViewDialogProps) {
  if (!protocol) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">{protocol.title}</DialogTitle>
          <DialogDescription>
            Visualización del protocolo y sus pasos.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-6">
            <div className="space-y-6 py-4">
                {protocol.steps.map((step, index) => (
                    <div key={index}>
                        <h3 className="font-semibold text-lg text-foreground">
                            Paso {index + 1}: {step.title}
                        </h3>
                        <p className="mt-1 text-muted-foreground whitespace-pre-wrap">
                            {step.description}
                        </p>
                         {index < protocol.steps.length - 1 && <Separator className="mt-6" />}
                    </div>
                ))}
            </div>
        </ScrollArea>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
