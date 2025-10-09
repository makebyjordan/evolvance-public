
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OfficeProtocolsClientPage } from "./components/OfficeProtocolsClientPage";
import { ClipboardList } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function OfficeProtocolsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <ClipboardList className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Protocolos de Oficina</CardTitle>
                        <CardDescription>
                            Consulta los protocolos de actuación y procesos internos.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <OfficeProtocolsClientPage />
    </div>
  );
}
