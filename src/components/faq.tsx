
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from './fade-in';
import { getWebContent, type FaqContent } from "@/app/actions/web-content-actions";

export default async function Faq() {
  
  const content = await getWebContent<FaqContent>('faq');
  
  const defaultContent: FaqContent = {
    title: 'Preguntas Frecuentes',
    items: [
        {
            question: "¿Qué tipo de empresas pueden beneficiarse de vuestros servicios?",
            answer: "Trabajamos con una amplia gama de empresas, desde startups innovadoras hasta corporaciones consolidadas. Si buscas transformar tu negocio a través de la tecnología y estrategias de marketing avanzadas, somos tu aliado ideal."
        },
        {
            question: "¿Cómo es el proceso de trabajo con un nuevo cliente?",
            answer: "Comenzamos con una sesión estratégica para entender a fondo tus necesidades y objetivos. Luego, diseñamos una propuesta a medida. Durante todo el proyecto, mantenemos una comunicación fluida y transparente para asegurar que los resultados superen tus expectativas."
        },
        {
            question: "¿Puedo contratar un único servicio o necesito un paquete completo?",
            answer: "Ofrecemos total flexibilidad. Puedes contratar desde un servicio específico, como la creación de un chatbot, hasta una estrategia integral que combine IA, marketing y desarrollo. Nos adaptamos a lo que tu negocio necesita en cada momento."
        }
    ]
  };
  
  const { title, items } = content || defaultContent;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-20 sm:py-32 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-foreground">
            {title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Accordion type="single" collapsible className="w-full mt-12">
            {items.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-bold">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                        {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
