
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProposalsClientPage } from "./components/ProposalsClientPage";

export const dynamic = 'force-dynamic';

export default function ProposalsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Propuestas HTML</CardTitle>
                <CardDescription>
                    Crea, edita y gestiona tus propuestas comerciales en formato HTML para compartir con clientes.
                </CardDescription>
            </CardHeader>
        </Card>
        <ProposalsClientPage />
    </div>
  );
}
