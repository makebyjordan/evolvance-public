
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HorarioClientPage } from "./components/HorarioClientPage";
import { Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function HorarioPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <Calendar className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Registro Horario</CardTitle>
                        <CardDescription>
                            Registra el inicio y fin de la jornada laboral de los miembros del equipo.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <HorarioClientPage />
    </div>
  );
}
