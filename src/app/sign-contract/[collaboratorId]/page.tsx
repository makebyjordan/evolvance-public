
"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import type { Collaborator } from '@/app/actions/collaborators-actions';
import { saveCollaborator } from '@/app/actions/collaborators-actions';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { AlertTriangle, Loader2, Save, CheckCircle, FileWarning } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';

export default function SignContractPublicPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const contractContainerRef = useRef<HTMLDivElement>(null);

  const collaboratorId = Array.isArray(params.collaboratorId) ? params.collaboratorId[0] : params.collaboratorId;
  
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar colaborador
  useEffect(() => {
    if (!collaboratorId) {
      setError("ID de colaborador no válido.");
      setLoading(false);
      return;
    };
    const unsub = onSnapshot(doc(db, "collaborators", collaboratorId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Omit<Collaborator, 'id'>;
        setCollaborator({ id: doc.id, ...data });
      } else {
        setError("El contrato o colaborador no ha sido encontrado.");
      }
      setLoading(false);
    }, (err) => {
        console.error("Error fetching collaborator:", err);
        setError("No se pudo cargar el contrato.");
        setLoading(false);
    });
    return () => unsub();
  }, [collaboratorId]);


  const handleSaveContract = async () => {
    if (!collaborator || !collaborator.contractHtml || !contractContainerRef.current) return;
    setIsSaving(true);
    
    const inputs = contractContainerRef.current.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const el = input as HTMLInputElement | HTMLTextAreaElement;
      el.setAttribute('value', el.value);
    });

    const finalHtmlToSave = contractContainerRef.current.innerHTML;

    const result = await saveCollaborator({
        id: collaborator.id,
        contractHtml: finalHtmlToSave,
        contractStatus: "Firmado",
    });

    if (result.success) {
        toast({
            title: "Contrato Guardado y Firmado",
            description: "Gracias. El contrato ha sido guardado correctamente.",
            className: "bg-green-500 text-white"
        });
    } else {
        toast({
            variant: "destructive",
            title: "Error al guardar",
            description: result.error,
        });
    }
    setIsSaving(false);
  }
  

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando contrato...</p>
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al cargar la página</AlertTitle>
            <AlertDescription><p>{error}</p></AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!collaborator || !collaborator.contractHtml) {
     return (
       <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card className="max-w-lg text-center">
            <CardHeader>
                <FileWarning className="mx-auto h-12 w-12 text-destructive" />
                <CardTitle>Contrato No Disponible</CardTitle>
                <CardDescription>
                    Este contrato aún no ha sido generado. Por favor, contacta con Evol-vance para que lo preparen.
                </CardDescription>
            </CardHeader>
        </Card>
      </div>
     )
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="py-4 px-8 border-b border-border">
          <Image src="https://iili.io/K78fXyb.png" alt="Evol-vance Logo" width={150} height={40} />
      </header>
      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Contrato de Colaboración</CardTitle>
                <CardDescription>
                    Para: <span className="font-bold text-primary">{collaborator?.name}</span>
                </CardDescription>
                 {collaborator?.contractStatus === 'Firmado' && (
                    <Alert variant="default" className="mt-4 bg-green-500/10 border-green-500/30">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle className="text-green-400">Contrato ya firmado</AlertTitle>
                        <AlertDescription className="text-green-500/80">
                            Este contrato ya ha sido firmado y guardado. Si necesitas hacer cambios, por favor, contacta con Evol-vance.
                        </AlertDescription>
                    </Alert>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                <div
                    ref={contractContainerRef}
                    className="p-8 border rounded-lg bg-white text-black prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: collaborator.contractHtml }}
                />
            </CardContent>
            <CardFooter>
                 <Button onClick={handleSaveContract} disabled={isSaving || collaborator.contractStatus === 'Firmado'}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {collaborator.contractStatus === 'Firmado' ? 'Contrato Guardado' : 'Guardar Contrato Firmado'}
                </Button>
            </CardFooter>
        </Card>
      </main>
       <footer className="text-center text-xs text-muted-foreground py-8">
            <p>© {new Date().getFullYear()} Evol-vance. Todos los derechos reservados.</p>
        </footer>
    </div>
  )
}
