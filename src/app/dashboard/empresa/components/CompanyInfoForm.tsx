
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { saveCompanyInfo, type CompanyInfo } from "@/app/actions/company-actions";

const companyInfoSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  phone: z.string().min(8, "El teléfono es requerido."),
  email: z.string().email("El email no es válido."),
  web: z.string().url("La URL del sitio web no es válida."),
  address: z.string().min(10, "La dirección es requerida."),
  logoUrl: z.string().url("La URL del logo no es válida."),
});

type CompanyFormValues = z.infer<typeof companyInfoSchema>;

interface CompanyInfoFormProps {
  initialContent: CompanyInfo | null;
}

export function CompanyInfoForm({ initialContent }: CompanyInfoFormProps) {
  const { toast } = useToast();
  
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: initialContent || {
      name: 'Evol-vance',
      phone: '+34 600 000 000',
      email: 'contacto@evol-vance.es',
      web: 'https://evol-vance.com',
      address: 'Calle Ficticia 123, 28080 Madrid, España',
      logoUrl: 'https://iili.io/KkYGiil.png',
    },
  });

  const onSubmit = async (values: CompanyFormValues) => {
    const result = await saveCompanyInfo(values);
    if (result.success) {
      toast({
        title: "Información Actualizada",
        description: "Los datos de la empresa han sido guardados.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error al guardar",
        description: result.error || "Ocurrió un error desconocido.",
      });
    }
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => ( <FormItem><FormLabel>Nombre de la Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Email de Contacto</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="web" render={({ field }) => ( <FormItem><FormLabel>Sitio Web</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>

            <FormField control={form.control} name="address" render={({ field }) => ( <FormItem><FormLabel>Dirección Fiscal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="logoUrl" render={({ field }) => ( <FormItem><FormLabel>URL del Logo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Información'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
