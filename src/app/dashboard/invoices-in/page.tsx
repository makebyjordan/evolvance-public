
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoicesInClientPage } from "./components/InvoicesInClientPage";

export const dynamic = 'force-dynamic';

export default async function InvoicesInPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Facturas Soportadas (IN)</CardTitle>
                <CardDescription>
                    Añade, visualiza y gestiona tus facturas de gastos y compras.
                </CardDescription>
            </CardHeader>
        </Card>
        <InvoicesInClientPage />
    </div>
  );
}
