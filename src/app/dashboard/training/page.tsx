
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Library } from "lucide-react";
import { TrainingClientPage } from "./components/TrainingClientPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrainingItemsClientPage } from "./components/TrainingItemsClientPage";


export const dynamic = 'force-dynamic';

export default async function TrainingPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Formación</CardTitle>
                        <CardDescription>
                            Crea y gestiona las subsecciones y los contenidos de tu área de formación.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        
        <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="items"><BookOpen className="w-4 h-4 mr-2" />Formaciones</TabsTrigger>
                <TabsTrigger value="subsections"><Library className="w-4 h-4 mr-2" />Subsecciones</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Formaciones</CardTitle>
                        <CardDescription>Añade, edita y gestiona las formaciones individuales.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <TrainingItemsClientPage />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="subsections">
                 <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Subsecciones</CardTitle>
                        <CardDescription>Organiza tus formaciones en subsecciones o categorías.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TrainingClientPage />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

    </div>
  );
}
