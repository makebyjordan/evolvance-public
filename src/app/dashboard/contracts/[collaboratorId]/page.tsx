
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, query, collection, where, getDocs, DocumentData } from 'firebase/firestore';
import { Collaborator, saveCollaborator } from '@/app/actions/collaborators-actions';
import { Html } from '@/app/actions/htmls-actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Loader2, Save, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContractPage() {
  const params = useParams();
  const router = useRouter();
  const collaboratorId = params.collaboratorId as string;

  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [contractTemplate, setContractTemplate] = useState<Html | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [companySignature, setCompanySignature] = useState('');
  const [collaboratorSignature, setCollaboratorSignature] = useState('');

  const { toast } = useToast();

  // Fetch collaborator and contract template
  useEffect(() => {
    if (!collaboratorId) {
      setError("ID de colaborador no válido.");
      setLoading(false);
      return;
    }

    const unsubCollaborator = onSnapshot(doc(db, 'collaborators', collaboratorId), 
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          setCollaborator({ id: docSnap.id, ...data } as Collaborator);
        } else {
          setError("Colaborador no encontrado.");
        }
      },
      (err) => {
        console.error("Error fetching collaborator:", err);
        setError("No se pudo cargar el colaborador.");
      }
    );

    const fetchContractTemplate = async () => {
      try {
        const q = query(
          collection(db, "htmls"),
          where("owner", "==", "jordan"),
          where("title", "==", "Contrato colaboración")
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data() as DocumentData;
          setContractTemplate({ id: querySnapshot.docs[0].id, ...docData } as Html);
        } else {
          setError("No se encontró la plantilla de contrato 'Contrato colaboración' de Jordan.");
        }
      } catch (err) {
        console.error("Error fetching contract template:", err);
        setError("No se pudo cargar la plantilla del contrato.");
      }
    };

    Promise.all([fetchContractTemplate()]).finally(() => setLoading(false));

    return () => {
      unsubCollaborator();
    };
  }, [collaboratorId]);
  
  const getRenderedContract = () => {
    if (!collaborator || !contractTemplate) return '';
    let html = contractTemplate.htmlText;
    html = html.replace(/{{name}}/g, collaborator.name);
    html = html.replace(/{{email}}/g, collaborator.email);
    html = html.replace(/{{phone}}/g, collaborator.phone);
    // You can add more placeholders here
    return html;
  };
  
  const handleSaveContract = async () => {
    if (!collaborator || !companySignature) {
        toast({
            variant: "destructive",
            title: "Firma Requerida",
            description: "Debes firmar como empresa para guardar el contrato.",
        });
        return;
    }
    
    setIsSaving(true);
    
    const finalHtml = getRenderedContract()
        .replace('</body>', `<hr><p><strong>Firma de la Empresa:</strong> ${companySignature}</p></body>`);
        
    const result = await saveCollaborator({
        id: collaborator.id,
        contractHtml: finalHtml,
        contractStatus: 'Contrato Generado',
    });

    setIsSaving(false);

    if (result.success) {
      toast({
        title: "Contrato Guardado",
        description: "El contrato se ha guardado para el colaborador.",
      });
      router.push('/dashboard/collaborators');
    } else {
      toast({
        variant: "destructive",
        title: "Error al Guardar",
        description: result.error || "No se pudo guardar el contrato.",
      });
    }
  };


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
       <Button variant="outline" onClick={() => router.push('/dashboard/collaborators')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Colaboradores
        </Button>

      <Card>
        <CardHeader>
          <CardTitle>Contrato de Colaboración: {collaborator?.name}</CardTitle>
          <CardDescription>
            Revisa la plantilla, completa los campos de firma y guarda el contrato.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-white text-black h-96 overflow-y-auto mb-6">
            {contractTemplate ? (
              <div dangerouslySetInnerHTML={{ __html: getRenderedContract() }} />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="company-signature">Firma (Empresa)</Label>
              <Input 
                id="company-signature"
                placeholder="Escribe el nombre de la persona que firma por la empresa"
                value={companySignature}
                onChange={(e) => setCompanySignature(e.target.value)}
              />
            </div>
            <div>
               <Label htmlFor="collaborator-signature" className="text-muted-foreground">Firma (Colaborador) - Próximamente</Label>
              <Input 
                id="collaborator-signature"
                placeholder="El colaborador firmará más adelante"
                disabled
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
            <Button onClick={handleSaveContract} disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSaving ? 'Guardando...' : 'Guardar Contrato'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

