
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FacturasClientPage } from "./components/FacturasClientPage";
import { Receipt } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function FacturasPage() {
  return (
      <div>
              <Card className="mb-8">
                          <CardHeader>
                                           <div className="flex items-center gap-4">
                                                               <Receipt className="w-8 h-8 text-primary" />
                                                                                   <div>
                                                                                                           <CardTitle className="text-2xl font-headline">Gestión de Facturas</CardTitle>
                                                                                                                                   <CardDescription>
                                                                                                                                                               Crea, visualiza y gestiona las facturas de tus clientes.
                                                                                                                                                                                       </CardDescription>
                                                                                                                                                                                                           </div>
                                                                                                                                                                                                                           </div>
                                                                                                                                                                                                                                       </CardHeader>
                                                                                                                                                                                                                                               </Card>
                                                                                                                                                                                                                                                       <FacturasClientPage />
                                                                                                                                                                                                                                                           </div>
                                                                                                                                                                                                                                                             );
                                                                                                                                                                                                                                                             }
                                                                                                                                                                                                                                                             