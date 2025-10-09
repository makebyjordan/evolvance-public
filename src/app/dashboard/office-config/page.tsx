
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OfficeSectionsClientPage } from "./components/OfficeSectionsClientPage";
import { Settings } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function OfficeConfigPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Settings className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Configuración del Dashboard de Oficina</CardTitle>
                        <CardDescription>
                            Crea, edita y elimina las secciones que aparecerán en el menú del dashboard de la oficina.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <OfficeSectionsClientPage />
    </div>
  );
}
