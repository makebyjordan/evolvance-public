
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Presentation } from "@/app/actions/presentations-actions";
import { Eye } from "lucide-react";

interface PresentationCardProps {
  presentation: Presentation;
}

export function PresentationCard({ presentation }: PresentationCardProps) {
  const [inputCode, setInputCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const handleVerifyCode = () => {
    if (inputCode === presentation.code) {
      setIsVerified(true);
      toast({
        title: "Código Correcto",
        description: "Ya puedes ver la presentación.",
      });
    } else {
      setIsVerified(false);
      toast({
        variant: "destructive",
        title: "Código Incorrecto",
        description: "El código introducido no es válido.",
      });
    }
  };
  
  const handleViewPresentation = () => {
    window.open(`/view-presentation/${presentation.id}`, '_blank');
  };

  return (
    <div className="card-animated-border h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="font-headline">{presentation.title}</CardTitle>
          <CardDescription>
            Para ver esta presentación, introduce el código de acceso.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Código de acceso"
              value={inputCode}
              onChange={(e) => {
                  setInputCode(e.target.value);
                  if(isVerified) setIsVerified(false);
              }}
              disabled={isVerified}
            />
            {!isVerified && (
               <Button onClick={handleVerifyCode} variant="secondary">
                  Verificar
               </Button>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
              className="w-full" 
              disabled={!isVerified} 
              onClick={handleViewPresentation}>
            <Eye className="mr-2 h-4 w-4" />
            Ver Presentación
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
