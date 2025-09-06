
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { getWebContent, type PageContent } from '@/app/actions/web-content-actions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function TermsPage() {

    const content = await getWebContent<PageContent>('terms');

    const defaultContent: PageContent = {
        title: 'Términos y Condiciones',
        markdownContent: `
# Términos y Condiciones

Por favor, edita este contenido desde el dashboard.

## 1. Introducción

Bienvenido a Evol-vance. Estos términos y condiciones describen las reglas y regulaciones para el uso de nuestro sitio web.

## 2. Aceptación

Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Evol-vance si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.
`
    };

    const { title, markdownContent } = content || defaultContent;

    return (
        <div className="relative isolate overflow-hidden bg-background">
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-32 pb-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Card className="max-w-4xl w-full mx-auto">
                            <CardContent className="py-8">
                                <article className="prose dark:prose-invert prose-lg max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {markdownContent}
                                    </ReactMarkdown>
                                </article>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
