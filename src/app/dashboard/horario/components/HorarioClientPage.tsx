
"use client";

import { useState, useEffect } from "react";
import type { User, UserStatus, WorkSession } from "@/app/actions/horario-actions";
import { startWorkSession, endWorkSession } from "@/app/actions/horario-actions";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, query, where, orderBy, Timestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, History } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const USERS: User[] = ['sandra', 'julian', 'jordan'];

const formatDuration = (minutes: number) => {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
};

export function HorarioClientPage() {
    const [statuses, setStatuses] = useState<Record<User, UserStatus>>({} as Record<User, UserStatus>);
    const [sessions, setSessions] = useState<Record<User, WorkSession[]>>({} as Record<User, WorkSession[]>);
    const [totals, setTotals] = useState<Record<User, { total: number, today: number }>>({} as Record<User, { total: number, today: number }>);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribers = USERS.map(user => 
            onSnapshot(doc(db, "userStatus", user), 
                (docSnap) => {
                    if (docSnap.exists()) {
                        setStatuses(prev => ({ ...prev, [user]: docSnap.data() as UserStatus }));
                    }
                },
                (err) => {
                    console.error(`Error fetching status for ${user}:`, err);
                    setError("No se pudo cargar el estado de los usuarios.");
                }
            )
        );

        const q = query(collection(db, "workSessions"), orderBy("startTime", "desc"));
        const unsubSessions = onSnapshot(q, (snapshot) => {
            const allSessions: WorkSession[] = snapshot.docs.map(d => ({id: d.id, ...d.data()}) as WorkSession);
            
            const sessionsByUser: Record<User, WorkSession[]> = { sandra: [], julian: [], jordan: [] };
            const totalsByUser: Record<User, { total: number, today: number }> = { sandra: {total: 0, today: 0}, julian: {total: 0, today: 0}, jordan: {total: 0, today: 0} };
            
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            allSessions.forEach(session => {
                if (USERS.includes(session.userId)) {
                    sessionsByUser[session.userId].push(session);
                    const duration = session.duration || 0;
                    totalsByUser[session.userId].total += duration;

                    if (session.startTime && (session.startTime as Timestamp).toDate() > todayStart) {
                         totalsByUser[session.userId].today += duration;
                    }
                }
            });
            setSessions(sessionsByUser);
            setTotals(totalsByUser);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching sessions:", err);
            setError("No se pudieron cargar las sesiones de trabajo.");
            setLoading(false);
        });

        unsubscribers.push(unsubSessions);
        
        return () => unsubscribers.forEach(unsub => unsub());
    }, []);

    const handleToggle = async (userId: User, isWorking: boolean, currentSessionId?: string) => {
        if (isWorking) {
            // User wants to stop working
            if (currentSessionId) {
                const result = await endWorkSession(userId, currentSessionId);
                if (!result.success) {
                    toast({ variant: "destructive", title: "Error", description: result.error });
                }
            }
        } else {
            // User wants to start working
            const result = await startWorkSession(userId);
            if (!result.success) {
                toast({ variant: "destructive", title: "Error", description: result.error });
            }
        }
    };
    
     if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}><CardHeader><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-1/4" /></CardHeader><CardContent><Skeleton className="h-10 w-full" /></CardContent></Card>
                ))}
            </div>
        );
    }

    if (error) {
        return <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
    }


    return (
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {USERS.map(user => {
                const userStatus = statuses[user];
                const userSessions = sessions[user] || [];
                const userTotals = totals[user] || { total: 0, today: 0 };

                return (
                <Card key={user} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="capitalize font-headline text-2xl">{user}</CardTitle>
                         <CardDescription>
                            Estado actual y registro de horas
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-6">
                         <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                            <Label htmlFor={`working-switch-${user}`} className="flex flex-col space-y-1">
                                <span className="font-medium">Trabajando</span>
                                <span className={`text-xs ${userStatus?.isWorking ? 'text-green-500' : 'text-muted-foreground'}`}>
                                    {userStatus?.isWorking ? 'Activo' : 'Inactivo'}
                                </span>
                            </Label>
                            <Switch 
                                id={`working-switch-${user}`}
                                checked={userStatus?.isWorking || false}
                                onCheckedChange={() => handleToggle(user, userStatus?.isWorking, userStatus?.currentSessionId)}
                            />
                        </div>

                         <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Horas hoy</p>
                                <p className="text-2xl font-bold">{formatDuration(userTotals.today)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total histórico</p>
                                <p className="text-2xl font-bold">{formatDuration(userTotals.total)}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2"><History className="w-4 h-4"/> Historial Reciente</h4>
                             <ScrollArea className="h-64">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead className="text-right">Duración</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {userSessions.length > 0 ? userSessions.map(s => (
                                            <TableRow key={s.id}>
                                                <TableCell>{s.startTime ? (s.startTime as Timestamp).toDate().toLocaleDateString('es-ES') : '-'}</TableCell>
                                                <TableCell className="text-right">{s.duration ? formatDuration(s.duration) : <span className="text-yellow-500">En curso</span>}</TableCell>
                                            </TableRow>
                                        )) : (
                                            <TableRow>
                                                <TableCell colSpan={2} className="text-center h-24">No hay sesiones</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                             </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            )})}
        </div>
    );
}
