
import { getProposalsList } from "@/app/actions/proposals-actions";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProposalsClientPage } from "./components/ProposalsClientPage";
import { AlertTriangle } from 'lucide-react';

export default async function ProposalsPage() {
  const { proposals, error } = await getProposalsList();

  if (error) {
    return (
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error de Conexión</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
                <p className="mt-2 text-xs">
                    Esta operación requiere configuración del servidor (Firebase Admin SDK) que parece no estar completa.
                </p>
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Propuestas</CardTitle>
                <CardDescription>
                    Crea, edita y gestiona todas tus propuestas comerciales desde un único lugar.
                </CardDescription>
            </CardHeader>
        </Card>
        <ProposalsClientPage initialProposals={proposals} />
    </div>
  );
}
