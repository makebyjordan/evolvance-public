
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServicesClientPage } from "./components/ServicesClientPage";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Servicios</CardTitle>
                <CardDescription>
                    Define y gestiona tu catálogo de servicios, controla costos y beneficios.
                </CardDescription>
            </CardHeader>
        </Card>
        <ServicesClientPage />
    </div>
  );
}
