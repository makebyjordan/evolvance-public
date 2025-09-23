
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { type Factura } from '@/app/actions/facturas-actions';
import { type CompanyInfo, getCompanyInfo } from '@/app/actions/company-actions';
import { AlertTriangle, Loader2, Printer } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PrintFacturaPage() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [factura, setFactura] = useState<Factura | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("No se ha proporcionado un ID de factura.");
            setLoading(false);
            return;
        }

        async function fetchData() {
            try {
                const facturaRef = doc(db, 'facturas', id);
                const [facturaSnap, companyData] = await Promise.all([
                    getDoc(facturaRef),
                    getCompanyInfo()
                ]);

                if (facturaSnap.exists()) {
                    const data = facturaSnap.data();
                    
                    const convertTimestamp = (ts: any) => {
                        if (ts instanceof Timestamp) {
                            return ts.toDate();
                        }
                        // Handle cases where it might already be a string or JS Date
                        return new Date(ts);
                    };

                    setFactura({ 
                        id: facturaSnap.id, 
                        ...data,
                        date: convertTimestamp(data.date),
                        dueDate: convertTimestamp(data.dueDate)
                    } as Factura);
                } else {
                    setError("Factura no encontrada.");
                }

                setCompanyInfo(companyData);
                
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("No se pudieron cargar los datos para la impresión.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);
    
    useEffect(() => {
        if (!loading && !error && factura) {
            // Automatically trigger print dialog once data is loaded
            // window.print();
        }
    }, [loading, error, factura]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-2">Cargando datos de la factura...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <Alert variant="destructive" className="max-w-md"><AlertTriangle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>
            </div>
        );
    }
    
    if (!factura || !companyInfo) {
        return <div className="flex items-center justify-center min-h-screen">No se encontraron datos.</div>;
    }

    const formatDate = (date: any) => {
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) return "Fecha inválida";
            return d.toLocaleDateString('es-ES');
        } catch {
            return "Fecha inválida";
        }
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);

    return (
       <div className="bg-white text-black p-8 md:p-12 font-sans max-w-4xl mx-auto my-12 shadow-lg rounded-lg print:shadow-none print:my-0 print:rounded-none">
            <Button onClick={() => window.print()} className="absolute top-4 right-4 print:hidden">
                <Printer className="mr-2 h-4 w-4"/>
                Imprimir o Guardar como PDF
            </Button>
            <header className="flex justify-between items-start mb-12 border-b pb-8">
                <div>
                    {companyInfo.logoUrl && <Image src={companyInfo.logoUrl} alt="Logo" width={150} height={150} className="mb-4"/>}
                    <h1 className="text-2xl font-bold">{companyInfo.name}</h1>
                    <p className="text-sm">{companyInfo.address}</p>
                    <p className="text-sm">{companyInfo.email} | {companyInfo.phone}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-3xl font-bold uppercase text-gray-700">Factura</h2>
                    <p className="text-sm">Nº: <span className="font-semibold">{factura.facturaNumber}</span></p>
                    <p className="text-sm">Fecha: <span className="font-semibold">{formatDate(factura.date)}</span></p>
                     <p className="text-sm">Vencimiento: <span className="font-semibold">{formatDate(factura.dueDate)}</span></p>
                </div>
            </header>

            <section className="mb-12">
                <h3 className="font-bold mb-2 text-gray-600">CLIENTE:</h3>
                <p className="font-bold">{factura.clientName}</p>
                <div className="text-sm whitespace-pre-wrap">{factura.clientInfo}</div>
            </section>
            
            <section>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 font-bold">Descripción</th>
                            <th className="p-2 font-bold text-right">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {factura.items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2">{item.description}</td>
                                <td className="p-2 text-right">{formatCurrency(item.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <section className="flex justify-end mt-8">
                <div className="w-full md:w-1/2">
                    <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg">
                        <span className="text-xl font-bold">TOTAL</span>
                        <span className="text-xl font-bold">{formatCurrency(factura.total)}</span>
                    </div>
                </div>
            </section>

             {factura.notes && (
                <section className="mt-12 text-sm text-gray-600">
                    <h4 className="font-bold mb-2">Notas:</h4>
                    <p className="whitespace-pre-wrap">{factura.notes}</p>
                </section>
            )}

            <footer className="text-center text-xs text-gray-500 mt-16 pt-4 border-t">
                <p>Gracias por su confianza.</p>
                <p>{companyInfo.name} - {companyInfo.web}</p>
            </footer>
       </div>
    );
}
