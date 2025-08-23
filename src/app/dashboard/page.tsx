
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-foreground mb-2">
        ¡Bienvenido de vuelta, {user?.displayName || 'Admin'}!
      </h1>
      <p className="text-muted-foreground mb-8">
        Aquí tienes un resumen de la actividad reciente de tu negocio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card>
           <CardHeader>
            <CardTitle className="text-lg">Propuestas Enviadas</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">0</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
            <CardTitle className="text-lg">Clientes Nuevos</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">0</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
            <CardTitle className="text-lg">Colaboradores Activos</CardTitle>
             <CardDescription>Estado "Firmado"</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">0</p>
           </CardContent>
         </Card>
          <Card>
           <CardHeader>
            <CardTitle className="text-lg">Ingresos Potenciales</CardTitle>
            <CardDescription>Total de propuestas</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">0€</p>
           </CardContent>
         </Card>
      </div>

       <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Próximos Pasos</CardTitle>
                <CardDescription>
                    A medida que añadas datos en las otras secciones, este panel de resumen se irá poblando con métricas y gráficos útiles.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Empieza por crear tu primera propuesta, cliente o servicio para ver cómo funciona.
                </p>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
