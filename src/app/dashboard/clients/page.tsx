
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientsClientPage } from "./components/ClientsClientPage";

export const dynamic = 'force-dynamic';

export default async function ClientsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Clientes</CardTitle>
                <CardDescription>
                    Añade, visualiza y gestiona la información de tus clientes. Los datos se actualizan en tiempo real.
                </CardDescription>
            </CardHeader>
        </Card>
        <ClientsClientPage />
    </div>
  );
}
