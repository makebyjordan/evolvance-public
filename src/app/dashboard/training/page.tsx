
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

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
                            Crea, gestiona y asigna cursos y materiales de formación para tu equipo o clientes.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Próximamente podrás gestionar aquí todos los recursos de formación.</p>
            </CardContent>
        </Card>
    </div>
  );
}
