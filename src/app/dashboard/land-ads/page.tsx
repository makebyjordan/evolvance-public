
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LandAdsClientPage } from "./components/LandAdsClientPage";

export const dynamic = 'force-dynamic';

export default function LandAdsPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de LandADS</CardTitle>
                <CardDescription>
                    Crea, edita y gestiona tus páginas de aterrizaje para anuncios.
                </CardDescription>
            </CardHeader>
        </Card>
        <LandAdsClientPage />
    </div>
  );
}
