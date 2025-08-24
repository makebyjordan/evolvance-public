
"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where, Timestamp } from "firebase/firestore";

interface Proposal {
  createdAt: Timestamp;
}

interface Client {
  createdAt: Timestamp;
}

interface Collaborator {
  contractStatus: string;
}

interface Service {
  salePrice: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    proposalsLast30Days: 0,
    newClientsLast30Days: 0,
    activeCollaborators: 0,
    potentialRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    const proposalsQuery = query(collection(db, "proposals"), where("createdAt", ">=", thirtyDaysAgoTimestamp));
    const clientsQuery = query(collection(db, "clients"), where("createdAt", ">=", thirtyDaysAgoTimestamp));
    const collaboratorsQuery = query(collection(db, "collaborators"), where("contractStatus", "==", "Firmado"));
    const servicesQuery = query(collection(db, "services"));

    const unsubscribers = [
      onSnapshot(proposalsQuery, (snapshot) => {
        setStats(prev => ({ ...prev, proposalsLast30Days: snapshot.size }));
      }),
      onSnapshot(clientsQuery, (snapshot) => {
        setStats(prev => ({ ...prev, newClientsLast30Days: snapshot.size }));
      }),
      onSnapshot(collaboratorsQuery, (snapshot) => {
        setStats(prev => ({ ...prev, activeCollaborators: snapshot.size }));
      }),
      onSnapshot(servicesQuery, (snapshot) => {
        let totalRevenue = 0;
        snapshot.forEach(doc => {
            const service = doc.data() as Service;
            totalRevenue += service.salePrice || 0;
        });
        setStats(prev => ({ ...prev, potentialRevenue: totalRevenue }));
      })
    ];
    
    setLoading(false);

    return () => unsubscribers.forEach(unsub => unsub());
  }, []);
  
   const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };


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
            <p className="text-4xl font-bold">{loading ? '...' : stats.proposalsLast30Days}</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
            <CardTitle className="text-lg">Clientes Nuevos</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">{loading ? '...' : stats.newClientsLast30Days}</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
            <CardTitle className="text-lg">Colaboradores Activos</CardTitle>
             <CardDescription>Estado "Firmado"</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">{loading ? '...' : stats.activeCollaborators}</p>
           </CardContent>
         </Card>
          <Card>
           <CardHeader>
            <CardTitle className="text-lg">Ingresos Potenciales</CardTitle>
            <CardDescription>Suma de servicios</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-4xl font-bold">{loading ? '...' : formatCurrency(stats.potentialRevenue)}</p>
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
                    Sigue creando propuestas, clientes o servicios para ver cómo las estadísticas cambian en tiempo real.
                </p>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
