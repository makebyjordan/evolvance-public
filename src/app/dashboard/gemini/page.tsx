
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { GeminiClientPage } from "./components/GeminiClientPage";

export const dynamic = 'force-dynamic';

export default function GeminiPage() {
  return (
    <div>
        <Card className="mb-8">
           <CardHeader>
                <div className="flex items-center gap-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Enlaces de Gemini</CardTitle>
                        <CardDescription>
                            Gestiona enlaces importantes o de uso frecuente.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <Card>
            <CardContent className="pt-6">
                <GeminiClientPage />
            </CardContent>
        </Card>
    </div>
  );
}
