
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PresupuestosClientPage } from "./components/PresupuestosClientPage";
import { CircleDollarSign } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PresupuestosPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                 <div className="flex items-center gap-4">
                    <CircleDollarSign className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Presupuestos</CardTitle>
                        <CardDescription>
                            Crea, visualiza, y convierte presupuestos en facturas.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <PresupuestosClientPage />
    </div>
  );
}
