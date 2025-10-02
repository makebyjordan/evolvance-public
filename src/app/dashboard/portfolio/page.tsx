
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioClientPage } from "./components/PortfolioClientPage";
import { LayoutGrid } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <LayoutGrid className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Portfolio</CardTitle>
                        <CardDescription>
                            Añade, edita y gestiona los proyectos que se muestran en la sección "Mis Creaciones" de tu web.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <PortfolioClientPage />
    </div>
  );
}
