
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProposalsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-grid-white/[0.05]" />
        <Card className="max-w-2xl w-full text-center bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary">Propuestas</CardTitle>
            <CardDescription>
              Aquí podrás ver todas las propuestas que te hemos enviado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Esta sección está actualmente en construcción.
            </p>
            <Button asChild>
              <Link href="/client-portal">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Portal
              </Link>
            </Button>
          </CardContent>
        </Card>
    </div>
  );
}
