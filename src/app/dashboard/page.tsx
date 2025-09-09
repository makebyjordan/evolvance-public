
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
import { TrendingUp, TrendingDown, Scale } from 'lucide-react';

interface Proposal {
  createdAt: Timestamp;
}

interface Client {
  createdAt: Timestamp;
}

interface Collaborator {
  contractStatus: string;
}

interface Invoice {
    total: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    proposalsLast30Days: 0,
    newClientsLast30Days: 0,
    activeCollaborators: 0,
    invoicesInTotal: 0,
    invoicesOutTotal: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    const queries = [
      { name: 'proposalsLast30Days', query: query(collection(db, "proposals"), where("createdAt", ">=", thirtyDaysAgoTimestamp)) },
      { name: 'newClientsLast30Days', query: query(collection(db, "clients"), where("createdAt", ">=", thirtyDaysAgoTimestamp)) },
      { name: 'activeCollaborators', query: query(collection(db, "collaborators"), where("contractStatus", "==", "Firmado")) },
      { name: 'invoicesInTotal', query: query(collection(db, "invoicesIn")), reducer: (acc: number, doc: any) => acc + (doc.data().total || 0) },
      { name: 'invoicesOutTotal', query: query(collection(db, "invoicesOut")), reducer: (acc: number, doc: any) => acc + (doc.data().total || 0) },
    ];

    const unsubscribers = queries.map(({ name, query: q, reducer }) => 
      onSnapshot(q, (snapshot) => {
        let value;
        if (reducer) {
            value = snapshot.docs.reduce(reducer, 0);
        } else {
            value = snapshot.size;
        }
        setStats(prev => ({ ...prev, [name]: value }));
      })
    );
    
    setLoading(false);

    return () => unsubscribers.forEach(unsub => unsub());
  }, []);
  
   const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  const balance = stats.invoicesOutTotal - stats.invoicesInTotal;

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-foreground mb-2">
        ¡Bienvenido de vuelta, {user?.displayName || 'Admin'}!
      </h1>
      <p className="text-muted-foreground mb-8">
        Aquí tienes un resumen de la actividad reciente de tu negocio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="card-animated-border">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Propuestas Enviadas</CardTitle>
              <CardDescription>Últimos 30 días</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{loading ? '...' : stats.proposalsLast30Days}</p>
            </CardContent>
          </Card>
         </div>
         <div className="card-animated-border">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Clientes Nuevos</CardTitle>
                <CardDescription>Últimos 30 días</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{loading ? '...' : stats.newClientsLast30Days}</p>
              </CardContent>
            </Card>
         </div>
         <div className="card-animated-border">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Colaboradores Activos</CardTitle>
              <CardDescription>Estado "Firmado"</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{loading ? '...' : stats.activeCollaborators}</p>
            </CardContent>
          </Card>
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="card-animated-border">
          <Card className="bg-green-600/10 border-green-600/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Facturado (Out)</CardTitle>
                  <TrendingUp className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                  <p className="text-3xl font-bold">{loading ? '...' : formatCurrency(stats.invoicesOutTotal)}</p>
              </CardContent>
          </Card>
        </div>
        <div className="card-animated-border">
          <Card className="bg-red-600/10 border-red-600/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Soportado (In)</CardTitle>
                  <TrendingDown className="h-5 w-5 text-red-500" />
              </CardHeader>
              <CardContent>
                  <p className="text-3xl font-bold">{loading ? '...' : formatCurrency(stats.invoicesInTotal)}</p>
              </CardContent>
          </Card>
        </div>
         <div className="card-animated-border">
          <Card className="bg-blue-600/10 border-blue-600/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Balance</CardTitle>
                  <Scale className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                  <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {loading ? '...' : formatCurrency(balance)}
                  </p>
              </CardContent>
          </Card>
        </div>
      </div>

       <div className="mt-8">
        <div className="card-animated-border">
          <Card>
              <CardHeader>
                  <CardTitle>Próximos Pasos</CardTitle>
                  <CardDescription>
                      Añade facturas en las nuevas secciones para ver cómo cambian las métricas financieras.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">
                      Sigue gestionando tu negocio para ver cómo las estadísticas evolucionan en tiempo real.
                  </p>
              </CardContent>
          </Card>
        </div>
       </div>
    </div>
  );
}
