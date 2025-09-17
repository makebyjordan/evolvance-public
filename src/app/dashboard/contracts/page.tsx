
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileSignature } from "lucide-react";
import { HtmlsClientPage } from "../jordan/components/HtmlsClientPage";

export const dynamic = 'force-dynamic';

export default function ContractsPage() {
  return (
    <div>
        <Card className="mb-8">
           <CardHeader>
                <div className="flex items-center gap-4">
                    <FileSignature className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Contratos</CardTitle>
                        <CardDescription>
                            Crea, edita y gestiona las plantillas HTML para tus contratos de colaboración.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card>
            <CardContent className="pt-6">
                <HtmlsClientPage owner="jordan" />
            </CardContent>
        </Card>
    </div>
  );
}
