
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CollaboratorsClientPage } from "./components/CollaboratorsClientPage";

export const dynamic = 'force-dynamic';

export default async function CollaboratorsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Colaboradores</CardTitle>
                <CardDescription>
                    Añade, visualiza y gestiona los datos y acuerdos de tus colaboradores.
                </CardDescription>
            </CardHeader>
        </Card>
        <CollaboratorsClientPage />
    </div>
  );
}
