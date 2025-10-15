
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function IAsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-headline">IAs</CardTitle>
                    <CardDescription>
                        Gestiona y configura tus inteligencias artificiales.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
    </div>
  );
}
