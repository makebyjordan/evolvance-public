
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Target } from "lucide-react";
import { HtmlsClientPage } from "../jordan/components/HtmlsClientPage";
import { ObjectivesClientPage } from "../components/objectives/ObjectivesClientPage";


export const dynamic = 'force-dynamic';

export default function SandraPage() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3 max-w-md">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="htmls">HTMLs</TabsTrigger>
        <TabsTrigger value="objectives">Objetivos</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card className="mt-4">
            <CardHeader>
                <CardTitle className="text-2xl font-headline">CRM de Sandra</CardTitle>
                <CardDescription>
                    Este es el espacio de trabajo para Sandra. Aquí se pueden gestionar sus clientes, tareas y propuestas.
                </CardDescription>
            </CardHeader>
             <CardContent>
                <p className="text-muted-foreground">Selecciona una pestaña para ver el contenido.</p>
            </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="htmls">
        <Card className="mt-4">
           <CardHeader>
                <div className="flex items-center gap-4">
                    <FileCode className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de HTMLs</CardTitle>
                        <CardDescription>
                            Crea, edita y gestiona los documentos HTML para las propuestas de Sandra.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <HtmlsClientPage owner="sandra" />
            </CardContent>
        </Card>
      </TabsContent>
        <TabsContent value="objectives">
        <Card className="mt-4">
           <CardHeader>
                <div className="flex items-center gap-4">
                    <Target className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Objetivos</CardTitle>
                        <CardDescription>
                            Define y sigue el progreso de los objetivos para Sandra.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ObjectivesClientPage owner="sandra" />
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
