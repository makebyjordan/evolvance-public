
"use client";

import { useState, useEffect } from "react";
import type { User, UserStatus } from "@/app/actions/horario-actions";
import { setUserStatus } from "@/app/actions/horario-actions";
import { db } from "@/lib/firebase";
import { onSnapshot, doc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, UserCheck, UserX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const USERS_CONFIG: Record<User, { email: string }> = {
    sandra: { email: 'sandra@evol-vance.es' },
    julian: { email: 'julian@evol-vance.com' },
    jordan: { email: 'jordangarciajara@gmail.com' },
};

const USERS: User[] = ['sandra', 'julian', 'jordan'];

export function HorarioClientPage() {
    const { user: currentUser } = useAuth();
    const [statuses, setStatuses] = useState<Record<User, UserStatus>>({} as Record<User, UserStatus>);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const loggedInUser = USERS.find(u => USERS_CONFIG[u].email === currentUser?.email);

    useEffect(() => {
        const unsubscribers = USERS.map(user => 
            onSnapshot(doc(db, "userStatus", user), 
                (docSnap) => {
                    if (docSnap.exists()) {
                        setStatuses(prev => ({ ...prev, [user]: docSnap.data() as UserStatus }));
                    } else {
                         // Set a default status if the document doesn't exist
                        setStatuses(prev => ({ ...prev, [user]: { isWorking: false } }));
                    }
                },
                (err) => {
                    console.error(`Error fetching status for ${user}:`, err);
                    setError("No se pudo cargar el estado de los usuarios.");
                }
            )
        );

        setLoading(false);
        
        return () => unsubscribers.forEach(unsub => unsub());
    }, []);

    const handleToggle = async (userId: User, isWorking: boolean) => {
        const result = await setUserStatus(userId, !isWorking);
        if (!result.success) {
            toast({ variant: "destructive", title: "Error", description: result.error });
        } else {
             toast({
                title: "Estado Actualizado",
                description: `El estado de ${userId} ahora es ${!isWorking ? 'Activo' : 'Inactivo'}.`,
            });
        }
    };
    
     if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}><CardHeader><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-1/4" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
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
                const userStatus = statuses[user] || { isWorking: false };
                const canToggle = loggedInUser === user;

                return (
                    <Card key={user} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="capitalize font-headline text-2xl">{user}</CardTitle>
                            <CardDescription>
                                Estado de actividad del usuario
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-center items-center space-y-6">
                            <div className={`p-6 rounded-full ${userStatus.isWorking ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                               {userStatus.isWorking ? <UserCheck className="w-16 h-16 text-green-500" /> : <UserX className="w-16 h-16 text-red-500" />}
                            </div>

                            <div className="flex items-center justify-between space-x-2 rounded-lg border p-4 w-full">
                                <Label htmlFor={`working-switch-${user}`} className="flex flex-col space-y-1">
                                    <span className="font-medium">Estado</span>
                                    <span className={`text-xs ${userStatus?.isWorking ? 'text-green-500' : 'text-red-500'}`}>
                                        {userStatus?.isWorking ? 'Activo' : 'Inactivo'}
                                    </span>
                                </Label>
                                <Switch 
                                    id={`working-switch-${user}`}
                                    checked={userStatus?.isWorking || false}
                                    onCheckedChange={() => handleToggle(user, userStatus?.isWorking)}
                                    disabled={!canToggle}
                                    aria-readonly={!canToggle}
                                />
                            </div>
                            {!canToggle && <p className="text-xs text-center text-muted-foreground pt-2">Inicia sesión como {user} para cambiar este estado.</p>}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
