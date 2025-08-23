
import { db, isFirebaseAdminInitialized } from '@/lib/firebase-admin';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getProposal(id: string) {
  if (!isFirebaseAdminInitialized()) {
    return { proposal: null, error: 'El servicio de Firebase no está inicializado en el servidor.' };
  }

  try {
    const docRef = db?.collection('proposals').doc(id);
    const doc = await docRef?.get();

    if (!doc?.exists) {
      return { proposal: null, error: 'No se encontró la propuesta.' };
    }

    const data = doc.data();
    if (!data) {
        return { proposal: null, error: 'No se encontraron datos para la propuesta.' };
    }

    return { 
        proposal: {
            id: doc.id,
            title: data.title,
            htmlText: data.htmlText,
        },
        error: null 
    };
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return { proposal: null, error: 'No se pudo cargar la propuesta.' };
  }
}

export default async function ViewProposalPage({ params }: { params: { id: string } }) {
  const { proposal, error } = await getProposal(params.id);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error al Cargar la Propuesta</AlertTitle>
            <AlertDescription>
                <p>{error}</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!proposal) {
     return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Propuesta no encontrada</AlertTitle>
            <AlertDescription>
                <p>La propuesta que buscas no existe o fue eliminada.</p>
            </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div dangerouslySetInnerHTML={{ __html: proposal.htmlText }} />
  );
}

// Opcional: añade metadatos dinámicos para el título de la página
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { proposal } = await getProposal(params.id);
  return {
    title: proposal ? `Propuesta: ${proposal.title}` : 'Ver Propuesta',
  };
}
