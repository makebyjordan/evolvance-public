
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="card-animated-border">
        <Card className="max-w-2xl w-full text-center">
          <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary">Proyectos</CardTitle>
            <CardDescription>
              Aquí podrás seguir el avance de todos tus proyectos.
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
    </div>
  );
}
