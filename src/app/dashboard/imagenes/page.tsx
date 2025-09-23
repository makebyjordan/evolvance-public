
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagesClientPage } from "./components/ImagesClientPage";
import { ImageIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ImagesPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <ImageIcon className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Galería de Imágenes</CardTitle>
                        <CardDescription>
                            Gestiona una galería centralizada de imágenes para reutilizar en tus presentaciones y LandADS.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <ImagesClientPage />
    </div>
  );
}
