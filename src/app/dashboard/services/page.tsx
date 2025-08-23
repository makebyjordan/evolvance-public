
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Gestión de Servicios</CardTitle>
                <CardDescription>
                    Próximamente: Define y gestiona tu catálogo de servicios y productos.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="text-center p-8 border rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">Sección en construcción</h3>
            <p className="mt-1 text-sm text-gray-500">La funcionalidad para gestionar servicios estará disponible pronto.</p>
        </div>
    </div>
  );
}
