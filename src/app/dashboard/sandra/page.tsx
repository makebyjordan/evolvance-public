
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SandraPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">CRM de Sandra</CardTitle>
                <CardDescription>
                    Este es el espacio de trabajo para Sandra. Aquí se pueden gestionar sus clientes, tareas y propuestas.
                </CardDescription>
            </CardHeader>
        </Card>
        {/* Aquí puedes empezar a añadir el contenido específico para Sandra */}
    </div>
  );
}
