
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function HerramientasPage() {
  return (
    <div>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Wrench className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-headline">Herramientas</CardTitle>
                    <CardDescription>
                        Accede a herramientas y utilidades de desarrollo.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
    </div>
  );
}
