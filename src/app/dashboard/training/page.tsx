
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { TrainingClientPage } from "./components/TrainingClientPage";

export const dynamic = 'force-dynamic';

export default async function TrainingPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Formación</CardTitle>
                        <CardDescription>
                            Crea y gestiona las subsecciones o módulos de tu área de formación.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <TrainingClientPage />
    </div>
  );
}
