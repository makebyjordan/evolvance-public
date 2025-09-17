
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, getDocs, collection, query, where, Timestamp, orderBy } from 'firebase/firestore';
import type { Collaborator } from '@/app/actions/collaborators-actions';
import type { Contract } from '@/app/actions/contracts-actions';
import { saveCollaborator } from '@/app/actions/collaborators-actions';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Loader2, ArrowLeft, Printer, FileText, Save, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignContractPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const collaboratorId = Array.isArray(params.collaboratorId) ? params.collaboratorId[0] : params.collaboratorId;
  
  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);
  const [loadingCollaborator, setLoadingCollaborator] = useState(true);
  
  const [contractTemplates, setContractTemplates] = useState<Contract[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  const [generatedContractHtml, setGeneratedContractHtml] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar colaborador
  useEffect(() => {
    if (!collaboratorId) return;
    const unsub = onSnapshot(doc(db, "collaborators", collaboratorId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Omit<Collaborator, 'id'>;
        setCollaborator({ id: doc.id, ...data });
        if (data.contractHtml) {
            setGeneratedContractHtml(data.contractHtml);
        }
      } else {
        setError("Colaborador no encontrado.");
      }
      setLoadingCollaborator(false);
    }, (err) => {
        console.error("Error fetching collaborator:", err);
        setError("No se pudo cargar el colaborador.");
        setLoadingCollaborator(false);
    });
    return () => unsub();
  }, [collaboratorId]);

  // Cargar plantillas de contrato
  useEffect(() => {
    const q = query(collection(db, "contracts"), orderBy("title", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
        const templates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contract));
        setContractTemplates(templates);
        setLoadingTemplates(false);
    }, (err) => {
        console.error("Error fetching templates:", err);
        setError("No se pudieron cargar las plantillas de contrato.");
        setLoadingTemplates(false);
    });
    return () => unsub();
  }, []);

  const handleGenerateContract = () => {
    if (!selectedTemplateId || !collaborator) return;
    const template = contractTemplates.find(t => t.id === selectedTemplateId);
    if (!template) return;

    let finalHtml = template.htmlText;
    const placeholders = {
        '{{name}}': collaborator.name,
        '{{email}}': collaborator.email,
        '{{phone}}': collaborator.phone,
        '{{evolvance_signature}}': `<input type="text" placeholder="Firma de Evol-vance..." class="border-b-2 border-gray-400 focus:border-primary outline-none w-full p-1 bg-transparent">`,
        '{{collaborator_signature}}': `<input type="text" placeholder="Firma del Colaborador..." class="border-b-2 border-gray-400 focus:border-primary outline-none w-full p-1 bg-transparent">`
    };
    
    Object.entries(placeholders).forEach(([key, value]) => {
        finalHtml = finalHtml.replace(new RegExp(key, 'g'), value);
    });
    setGeneratedContractHtml(finalHtml);
  }

  const handleSaveContract = async () => {
    if (!collaborator || !generatedContractHtml) return;
    setIsSaving(true);
    
    // Simulate getting the final HTML from the iframe/div
    // In a real scenario, you'd need a more robust way to capture inputs
    const finalHtmlToSave = generatedContractHtml;

    const result = await saveCollaborator({
        id: collaborator.id,
        contractHtml: finalHtmlToSave,
        contractStatus: "Contrato Generado",
    });

    if (result.success) {
        toast({
            title: "Contrato Guardado",
            description: "El contrato se ha guardado para el colaborador.",
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
  
  const handlePrint = () => {
      const printableContent = generatedContractHtml;
      const printWindow = window.open('', '', 'height=800,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Imprimir Contrato</title>');
        printWindow.document.write('<style>body{font-family:sans-serif;} input{border:none; border-bottom:1px solid #000;}</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(printableContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
  }


  if (loadingCollaborator || loadingTemplates) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando datos...</p>
        </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al cargar la página</AlertTitle>
            <AlertDescription><p>{error}</p></AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <Button variant="outline" onClick={() => router.push('/dashboard/collaborators')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Colaboradores
        </Button>
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestionar Contrato</CardTitle>
                <CardDescription>
                    Gestiona el contrato para: <span className="font-bold text-primary">{collaborator?.name}</span>
                </CardDescription>
                 {collaborator?.contractStatus === 'Contrato Generado' && (
                    <Alert variant="default" className="mt-4 bg-green-500/10 border-green-500/30">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertTitle className="text-green-400">Contrato ya generado</AlertTitle>
                        <AlertDescription className="text-green-500/80">
                            Este colaborador ya tiene un contrato guardado. Puedes visualizarlo o imprimirlo. Para generar uno nuevo, primero elimina el existente (funcionalidad futura).
                        </AlertDescription>
                    </Alert>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                {!generatedContractHtml && (
                    <div className="flex items-end gap-4 p-6 border rounded-lg bg-card-foreground/5">
                        <div className="flex-grow">
                             <Label htmlFor="template-select">Selecciona una plantilla de contrato</Label>
                            <Select onValueChange={setSelectedTemplateId} value={selectedTemplateId}>
                                <SelectTrigger id="template-select">
                                    <SelectValue placeholder="Elige una plantilla..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {contractTemplates.map(template => (
                                        <SelectItem key={template.id} value={template.id}>{template.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleGenerateContract} disabled={!selectedTemplateId}>
                            <FileText className="mr-2 h-4 w-4" />
                            Generar Contrato
                        </Button>
                    </div>
                )}
                
                {generatedContractHtml && (
                    <div>
                        <div className="flex justify-end gap-2 mb-4">
                           <Button onClick={handleSaveContract} disabled={isSaving || collaborator?.contractStatus === 'Contrato Generado'}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Guardar Contrato
                            </Button>
                            <Button onClick={handlePrint} variant="outline" disabled={!collaborator?.contractHtml}>
                                <Printer className="mr-2 h-4 w-4" />
                                Imprimir
                            </Button>
                        </div>
                        <div
                            className="p-8 border rounded-lg bg-white text-black prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: generatedContractHtml }}
                         />
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  )
}

    