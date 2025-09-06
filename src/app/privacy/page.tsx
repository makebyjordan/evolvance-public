
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { getWebContent, type PageContent } from '@/app/actions/web-content-actions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function PrivacyPage() {

    const content = await getWebContent<PageContent>('privacy');

    const defaultContent: PageContent = {
        title: 'Política de Privacidad',
        markdownContent: `
# Política de Privacidad

Por favor, edita este contenido desde el dashboard.

## 1. Información que recopilamos

Recopilamos información para proporcionar mejores servicios a todos nuestros usuarios.

## 2. Cómo usamos la información

Usamos la información que recopilamos para proporcionar, mantener, proteger y mejorar nuestros servicios, para desarrollar nuevos y para proteger a Evol-vance y a nuestros usuarios.
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
