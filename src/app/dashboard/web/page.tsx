
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Globe, HelpCircle, Bot, Milestone, ShieldCheck, FileType } from "lucide-react";
import { ServicesEditor } from "./components/ServicesEditor";
import { TimelineEditor } from "./components/TimelineEditor";
import { PhilosophyEditor } from "./components/PhilosophyEditor";
import { FaqEditor } from "./components/FaqEditor";
import { PageEditor } from "./components/PageEditor";

import { getWebContent, type ServicesContent, type TimelineContent, type PhilosophyContent, type FaqContent, type PageContent } from "@/app/actions/web-content-actions";

export const dynamic = 'force-dynamic';

export default async function WebPage() {

  const servicesContent = await getWebContent<ServicesContent>('services');
  const timelineContent = await getWebContent<TimelineContent>('timeline');
  const philosophyContent = await getWebContent<PhilosophyContent>('philosophy');
  const faqContent = await getWebContent<FaqContent>('faq');
  const termsContent = await getWebContent<PageContent>('terms');
  const privacyContent = await getWebContent<PageContent>('privacy');

  return (
    <div>
      <Card className="mb-8">
          <CardHeader>
              <div className="flex items-center gap-4">
                  <Globe className="w-8 h-8 text-primary" />
                  <div>
                      <CardTitle className="text-2xl font-headline">Gestión de Contenido Web</CardTitle>
                      <CardDescription>
                          Edita los textos, títulos y elementos de las diferentes secciones de tu página principal.
                      </CardDescription>
                  </div>
              </div>
          </CardHeader>
      </Card>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 max-w-4xl">
          <TabsTrigger value="services"><Bot className="w-4 h-4 mr-2"/>Servicios</TabsTrigger>
          <TabsTrigger value="timeline"><Milestone className="w-4 h-4 mr-2"/>Trayectoria</TabsTrigger>
          <TabsTrigger value="philosophy"><ShieldCheck className="w-4 h-4 mr-2"/>Filosofía</TabsTrigger>
          <TabsTrigger value="faq"><HelpCircle className="w-4 h-4 mr-2"/>FAQ</TabsTrigger>
          <TabsTrigger value="pages"><FileType className="w-4 h-4 mr-2"/>Páginas</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <ServicesEditor initialContent={servicesContent} />
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineEditor initialContent={timelineContent} />
        </TabsContent>
        <TabsContent value="philosophy">
          <PhilosophyEditor initialContent={philosophyContent} />
        </TabsContent>
        <TabsContent value="faq">
          <FaqEditor initialContent={faqContent} />
        </TabsContent>
        <TabsContent value="pages" className="space-y-6">
           <PageEditor 
              pageName="Términos y Condiciones"
              sectionId="terms"
              initialContent={termsContent} 
           />
           <PageEditor 
              pageName="Política de Privacidad"
              sectionId="privacy"
              initialContent={privacyContent}
           />
        </TabsContent>
      </Tabs>
    </div>
  );
}
