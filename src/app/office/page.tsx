
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function OfficePage() {
  const { user } = useAuth();
 
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-foreground mb-2">
        ¡Bienvenido a la oficina, {user?.displayName || 'miembro del equipo'}!
      </h1>
      <p className="text-muted-foreground mb-8">
        Este es tu panel de control interno.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="card-animated-border">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen</CardTitle>
              <CardDescription>Actividad reciente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Más estadísticas y datos aparecerán aquí a medida que construyamos esta sección.</p>
            </CardContent>
          </Card>
         </div>
         <div className="card-animated-border">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximos Pasos</CardTitle>
                <CardDescription>¿Qué quieres hacer ahora?</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-muted-foreground">Podemos añadir nuevas secciones como "Tareas", "Proyectos Internos" o "Documentación".</p>
              </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
