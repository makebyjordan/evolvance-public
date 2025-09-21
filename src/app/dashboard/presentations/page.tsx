
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PresentationsClientPage } from "./components/PresentationsClientPage";

export const dynamic = 'force-dynamic';

export default function PresentationsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Presentaciones</CardTitle>
                <CardDescription>
                    Crea, edita y gestiona tus presentaciones comerciales desde un único lugar.
                </CardDescription>
            </CardHeader>
        </Card>
        <PresentationsClientPage />
    </div>
  );
}
