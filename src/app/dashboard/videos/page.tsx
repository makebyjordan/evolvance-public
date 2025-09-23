
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VideosClientPage } from "./components/VideosClientPage";
import { Video } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  return (
    <div>
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Video className="w-8 h-8 text-primary" />
                    <div>
                        <CardTitle className="text-2xl font-headline">Galería de Videos</CardTitle>
                        <CardDescription>
                            Gestiona una galería centralizada de videos para reutilizar en tus presentaciones y LandADS.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
        <VideosClientPage />
    </div>
  );
}
