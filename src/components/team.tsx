
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FadeIn } from './fade-in';
import Image from 'next/image';
import teamImages from '@/lib/placeholder-images.json';

const teamMembers = [
  {
    name: "Julián",
    role: "Founder",
    image: teamImages['team-founder-1'],
  },
  {
    name: "Sandra",
    role: "Founder",
    image: teamImages['team-founder-2'],
  },
  {
    name: "Jordan",
    role: "CTO",
    image: teamImages['team-cto'],
  },
  {
    name: "Juanfra",
    role: "CMO",
    image: teamImages['team-cmo'],
  },
  {
    name: "Juan",
    role: "RV Dept",
    image: teamImages['team-rv'],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground">
            Nuestro Equipo
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
            Conoce a las mentes creativas y estratégicas que impulsan la innovación en Evol-vance.
          </p>
        </FadeIn>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="text-center overflow-hidden">
                 <div className="aspect-square relative w-full">
                    <Image
                        src={member.image.src}
                        alt={`Foto de ${member.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={member.image.hint}
                    />
                 </div>
                <CardHeader>
                  <CardTitle className="font-bold text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
