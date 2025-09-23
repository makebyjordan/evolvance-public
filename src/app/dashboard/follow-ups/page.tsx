
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FollowUpsClientPage } from "./components/FollowUpsClientPage";

export const dynamic = 'force-dynamic';

export default async function FollowUpsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Seguimientos</CardTitle>
                <CardDescription>
                    Registra y consulta todas las interacciones con tus clientes y leads para no perder ninguna oportunidad.
                </CardDescription>
            </CardHeader>
        </Card>
        <FollowUpsClientPage />
    </div>
  );
}
