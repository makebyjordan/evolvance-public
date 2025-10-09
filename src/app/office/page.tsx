
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function OfficePage() {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/office/login');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
             <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary">Bienvenido a la Oficina</CardTitle>
                    <CardDescription>
                        Este es tu espacio de trabajo interno.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Hola, <span className="font-bold">{user?.displayName || user?.email}</span>.</p>
                    <p className="mt-2 text-muted-foreground">Más funcionalidades estarán disponibles aquí pronto.</p>
                </CardContent>
                <CardContent>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        Cerrar Sesión
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
