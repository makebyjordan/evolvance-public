
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoicesOutClientPage } from "./components/InvoicesOutClientPage";

export const dynamic = 'force-dynamic';

export default async function InvoicesOutPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Facturas Emitidas (OUT)</CardTitle>
                <CardDescription>
                    Añade, visualiza y gestiona tus facturas de ventas y servicios.
                </CardDescription>
            </CardHeader>
        </Card>
        <InvoicesOutClientPage />
    </div>
  );
}
