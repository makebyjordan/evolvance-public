
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, MessageSquare, Briefcase } from 'lucide-react';

export default function ClientPortalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
       <div className="absolute top-0 left-0 w-full h-full -z-10 bg-grid-white/[0.05]" />
        <div className="text-center mb-8">
            <h1 className="text-4xl font-headline font-bold text-primary">Portal del Cliente</h1>
            <p className="text-muted-foreground mt-2">Bienvenido a tu área privada. Aquí puedes gestionar tus proyectos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Mis Propuestas</CardTitle>
                    <CardDescription>Consulta el estado y los detalles de las propuestas que te hemos enviado.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">Ver Propuestas</Button>
                </CardContent>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Mis Proyectos</CardTitle>
                    <CardDescription>Sigue el avance de tus proyectos en ejecución y accede a la documentación.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">Ver Proyectos</Button>
                </CardContent>
            </Card>

             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <MessageSquare className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Contacto</CardTitle>
                    <CardDescription>Comunícate directamente con nuestro equipo para cualquier consulta.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">Contactar</Button>
                </CardContent>
            </Card>
        </div>

        <div className="mt-12">
            <Button asChild>
                <Link href="/">Volver a la web principal</Link>
            </Button>
        </div>
    </div>
  );
}
