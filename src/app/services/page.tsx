import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <Card className="max-w-2xl w-full text-center mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">Nuestros Servicios</CardTitle>
                        <CardDescription>
                        Aquí encontrarás todos los servicios que ofrecemos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                        Esta sección está actualmente en construcción.
                        </p>
                        <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a la web principal
                        </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
