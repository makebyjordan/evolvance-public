
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";
import { ToolsClientPage } from "./components/ToolsClientPage";

export const dynamic = 'force-dynamic';

export default function HerramientasPage() {
  return (
    <div>
      <Card className="mb-8">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Wrench className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-headline">Herramientas</CardTitle>
                    <CardDescription>
                        Gestiona herramientas, enlaces y utilidades de desarrollo.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      <ToolsClientPage />
    </div>
  );
}
