
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, MessageSquare, Briefcase } from 'lucide-react';
import { useState } from "react";
import { ContactForm } from "@/components/contact-form";

export default function ClientPortalPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
          <div className="text-center mb-8">
              <h1 className="text-4xl font-headline font-bold text-primary">Portal del Cliente</h1>
              <p className="text-muted-foreground mt-2">Bienvenido a tu área privada. Aquí puedes gestionar tus proyectos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
              <Card>
                  <CardHeader>
                      <FileText className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>Propuestas</CardTitle>
                      <CardDescription>Consulta el estado y los detalles de las propuestas que te hemos enviado.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/proposals">Ver Propuestas</Link>
                    </Button>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <Briefcase className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>Proyectos</CardTitle>
                      <CardDescription>Sigue el avance de tus proyectos en ejecución y accede a la documentación.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/projects">Ver Proyectos</Link>
                    </Button>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <MessageSquare className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>Contacto</CardTitle>
                      <CardDescription>Comunícate directamente con nuestro equipo para cualquier consulta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button variant="outline" className="w-full" onClick={() => setIsContactFormOpen(true)}>
                        Contactar
                      </Button>
                  </CardContent>
              </Card>
          </div>

          <div className="mt-12">
              <Button asChild>
                  <Link href="/">Volver a la web principal</Link>
              </Button>
          </div>
      </div>
      <ContactForm isOpen={isContactFormOpen} setIsOpen={setIsContactFormOpen} />
    </>
  );
}
