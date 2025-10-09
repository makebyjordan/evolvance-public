
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProtocolsClientPage } from "@/app/dashboard/components/protocols/ProtocolsClientPage";
import { ClipboardList } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProtocolsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <ClipboardList className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Protocolos</CardTitle>
                        <CardDescription>
                            Crea y gestiona los protocolos de actuación y procesos internos de tu empresa.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <ProtocolsClientPage />
    </div>
  );
}
