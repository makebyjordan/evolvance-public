
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function FirebasePage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Flame className="w-8 h-8 text-primary" />
            <div>
                <CardTitle className="text-2xl font-headline">Firebase</CardTitle>
                <CardDescription>
                    Información y configuración de tu proyecto de Firebase.
                </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
