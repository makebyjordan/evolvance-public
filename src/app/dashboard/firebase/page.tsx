
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { FirebaseClientPage } from "./components/FirebaseClientPage";

export const dynamic = 'force-dynamic';

export default function FirebasePage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Flame className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Gestión de Proyectos Firebase</CardTitle>
                        <CardDescription>
                            Añade, visualiza y gestiona tus proyectos y despliegues.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <FirebaseClientPage />
    </div>
  );
}
