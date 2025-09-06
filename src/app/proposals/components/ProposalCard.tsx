
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
import type { Proposal } from "@/app/actions/proposals-actions";
import { Eye } from "lucide-react";

interface ProposalCardProps {
  proposal: Proposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const [inputCode, setInputCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const handleVerifyCode = () => {
    if (inputCode === proposal.code) {
      setIsVerified(true);
      toast({
        title: "Código Correcto",
        description: "Ya puedes ver la propuesta.",
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
  
  const handleViewProposal = () => {
    window.open(`/view-proposal/${proposal.id}`, '_blank');
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">{proposal.title}</CardTitle>
        <CardDescription>
          Para ver esta propuesta, introduce el código de acceso.
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
            onClick={handleViewProposal}>
          <Eye className="mr-2 h-4 w-4" />
          Ver Propuesta
        </Button>
      </CardFooter>
    </Card>
  );
}
