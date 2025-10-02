
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FadeIn } from "./fade-in";
import type { PortfolioProject } from "@/app/actions/portfolio-actions";

export default function Showcase() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const projectsData: PortfolioProject[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          projectsData.push({
            id: doc.id,
            ...data
          } as PortfolioProject);
        });
        setProjects(projectsData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching portfolio projects:", error);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <section id="showcase" className="py-20 md:py-32 w-full">
        <FadeIn>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">Casos de EXITO!</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Aquí puedes ver las últimas creaciones para nuestros clientes.
                </p>
            </div>
        </FadeIn>
      <div className="mt-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-muted-foreground">Aún no hay proyectos en el portafolio. ¡Crea uno desde el dashboard!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
               const projectUrl = project.url || `/portfolio/${project.id}`;
               return (
                <FadeIn key={project.id} delay={index * 0.1}>
                    <div className="card-animated-border h-full">
                        <Card className="overflow-hidden group flex flex-col h-full">
                            <CardHeader className="p-0">
                                <div className="aspect-video relative w-full">
                                    <Image
                                        src={project.imageUrl || 'https://placehold.co/600x400'}
                                        alt={project.description || 'Imagen del proyecto'}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        data-ai-hint={project.imageHint}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex-grow">
                                <CardTitle className="font-headline text-2xl">
                                    {project.title}
                                </CardTitle>
                                <p className="mt-2 text-muted-foreground">{project.description}</p>
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Link href={projectUrl} target={project.url ? "_blank" : "_self"} className="flex items-center text-primary hover:text-secondary transition-colors">
                                    Ver Proyecto <ArrowUpRight className="ml-1 w-4 h-4"/>
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </FadeIn>
            )})}
          </div>
        )}
      </div>
    </section>
  );
}
