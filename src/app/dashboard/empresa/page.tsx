
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { CompanyInfoForm } from "./components/CompanyInfoForm";
import { getCompanyInfo } from "@/app/actions/company-actions";

export const dynamic = 'force-dynamic';

export default async function CompanyPage() {
  const companyInfo = await getCompanyInfo();

  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Building2 className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Datos de la Empresa</CardTitle>
                        <CardDescription>
                            Gestiona la información de tu empresa que aparecerá en los presupuestos y facturas.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <CompanyInfoForm initialContent={companyInfo} />
    </div>
  );
}
