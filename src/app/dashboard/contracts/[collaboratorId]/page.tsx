
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
import { AlertTriangle, Loader2, Save, ArrowLeft, Printer } from 'lucide-react';
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
  
  useEffect(() => {
    if (!collaboratorId) {
      setError("ID de colaborador no válido.");
      setLoading(false);
      return;
    }

    const unsubCollaborator = onSnapshot(doc(db, 'collaborators', collaboratorId), 
      async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as DocumentData;
          const collabData = { id: docSnap.id, ...data } as Collaborator;
          setCollaborator(collabData);

          if (collabData.contractHtml && collabData.contractStatus === 'Firmado') {
              const companySigMatch = collabData.contractHtml.match(/<strong>Firma de la Empresa:<\/strong> (.*?)(<\/p>|<br>)/);
              if (companySigMatch) setCompanySignature(companySigMatch[1]);
              const collabSigMatch = collabData.contractHtml.match(/<strong>Firma del Colaborador:<\/strong> (.*?)(<\/p>|<br>)/);
              if (collabSigMatch) setCollaboratorSignature(collabSigMatch[1]);
              setLoading(false);
          } else {
              try {
                const q = query(
                  collection(db, "htmls"),
                  where("owner", "==", "jordan")
                );
                const querySnapshot = await getDocs(q);
                
                const template = querySnapshot.docs.find(doc => doc.data().title?.toLowerCase() === 'contrato colaboración');

                if (template) {
                  const docData = template.data() as DocumentData;
                  setContractTemplate({ id: template.id, ...docData } as Html);
                } else {
                  setError("No se encontró la plantilla de contrato 'Contrato colaboración' de Jordan.");
                }
              } catch (err) {
                console.error("Error fetching contract template:", err);
                setError("No se pudo cargar la plantilla del contrato.");
              } finally {
                setLoading(false);
              }
          }
        } else {
          setError("Colaborador no encontrado.");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching collaborator:", err);
        setError("No se pudo cargar el colaborador.");
        setLoading(false);
      }
    );

    return () => unsubCollaborator();

  }, [collaboratorId]);
  
  const getRenderedContract = () => {
    if (!collaborator) return '';
    if (collaborator.contractHtml) return collaborator.contractHtml;
    if (!contractTemplate) return 'Cargando plantilla...';
    
    let html = contractTemplate.htmlText;
    html = html.replace(/{{name}}/g, collaborator.name);
    html = html.replace(/{{email}}/g, collaborator.email);
    html = html.replace(/{{phone}}/g, collaborator.phone);
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
    
    let finalHtml = getRenderedContract();
    const signatureSection = `
        <div id="signature-section" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
            <p><strong>Firma de la Empresa:</strong> ${companySignature}</p>
            <p><strong>Firma del Colaborador:</strong> ${collaboratorSignature || 'Pendiente de firma'}</p>
        </div>`;

    if (!finalHtml.includes('id="signature-section"')) {
        finalHtml += signatureSection;
    } else {
         finalHtml = finalHtml.replace(/<div id="signature-section".*?<\/div>/s, signatureSection);
    }
        
    const result = await saveCollaborator({
        id: collaborator.id,
        contractHtml: finalHtml,
        contractStatus: 'Firmado',
    });

    setIsSaving(false);

    if (result.success) {
      toast({
        title: "Contrato Guardado y Firmado",
        description: "El contrato se ha guardado para el colaborador.",
      });
      // No redirigir, permitir imprimir
    } else {
      toast({
        variant: "destructive",
        title: "Error al Guardar",
        description: result.error || "No se pudo guardar el contrato.",
      });
    }
  };

  const handlePrint = () => {
      let contractContent = getRenderedContract();
       if (!contractContent.includes('id="signature-section"')) {
            contractContent += `
                <div id="signature-section" style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc;">
                    <p><strong>Firma de la Empresa:</strong> ${companySignature}</p>
                    <p><strong>Firma del Colaborador:</strong> ${collaboratorSignature || 'Pendiente de firma'}</p>
                </div>`;
      }
      const printWindow = window.open('', '_blank');
      if (printWindow) {
          printWindow.document.write(`
            <html>
                <head><title>Contrato de ${collaborator?.name}</title></head>
                <body>${contractContent}</body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          printWindow.print();
      } else {
          toast({
              variant: "destructive",
              title: "Error de Impresión",
              description: "No se pudo abrir la ventana para imprimir. Revisa la configuración de tu navegador."
          });
      }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
         <Button variant="outline" onClick={() => router.push('/dashboard/collaborators')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
        </Button>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const isSigned = collaborator?.contractStatus === 'Firmado';

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
             {isSigned ? 'El contrato ha sido firmado. Ahora puedes imprimirlo.' : 'Revisa la plantilla, completa los campos de firma y guarda el contrato.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-white text-black h-96 overflow-y-auto mb-6">
            <div dangerouslySetInnerHTML={{ __html: getRenderedContract() }} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="company-signature">Firma (Empresa)</Label>
              <Input 
                id="company-signature"
                placeholder="Escribe el nombre de la persona que firma por la empresa"
                value={companySignature}
                onChange={(e) => setCompanySignature(e.target.value)}
                disabled={isSigned}
              />
            </div>
            <div>
               <Label htmlFor="collaborator-signature">Firma (Colaborador)</Label>
              <Input 
                id="collaborator-signature"
                placeholder={isSigned ? collaboratorSignature : "El colaborador firmará digitalmente"}
                value={collaboratorSignature}
                onChange={(e) => setCollaboratorSignature(e.target.value)}
                disabled={isSigned}
              />
               <p className="text-xs text-muted-foreground mt-1">Este campo simula la firma del colaborador.</p>
            </div>
          </div>
          
          <div className="flex justify-end mt-8 space-x-4">
             {isSigned ? (
                <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir Contrato
                </Button>
            ) : (
                <Button onClick={handleSaveContract} disabled={isSaving || !companySignature}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isSaving ? 'Guardando...' : 'Guardar y Firmar'}
                </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
