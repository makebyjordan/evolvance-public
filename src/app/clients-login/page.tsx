
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from 'lucide-react';

const ACCESS_CODE = "EVOL";

const formSchema = z.object({
  code: z.string().min(1, { message: "El código es requerido." }),
});

export default function ClientsLoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.code === ACCESS_CODE) {
      toast({
        title: "Acceso Concedido",
        description: "Redirigiendo al portal de clientes...",
      });
      router.push('/client-portal'); 
    } else {
      toast({
        variant: "destructive",
        title: "Código Incorrecto",
        description: "El código de acceso no es válido. Inténtalo de nuevo.",
      });
       form.reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
       <div className="absolute top-0 left-0 w-full h-full -z-10 bg-grid-white/[0.05]" />
        <Card className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm relative">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="absolute top-4 left-4">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Volver a la web</span>
                </Button>
            </Link>
            <CardHeader className="text-center pt-12">
            <CardTitle className="text-2xl font-headline text-primary">Acceso Clientes</CardTitle>
            <CardDescription>
                Introduce tu código para acceder al portal.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Código de Acceso</FormLabel>
                        <FormControl>
                        <Input placeholder="Introduce 'EVOL'" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-2" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Verificando..." : "Entrar"}
                </Button>
                </form>
            </Form>
            </CardContent>
        </Card>
    </div>
  );
}
