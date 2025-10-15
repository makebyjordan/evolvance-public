
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { IasClientPage } from "./components/IasClientPage";

export const dynamic = 'force-dynamic';

export default function IAsPage() {
  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-headline">Gestión de IAs</CardTitle>
                    <CardDescription>
                        Añade, visualiza y gestiona tus suscripciones y herramientas de IA.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      <IasClientPage />
    </div>
  );
}
