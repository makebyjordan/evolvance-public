import { PrismaClient } from '../src/generated/prisma';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Mapeo de colecciones Firebase a modelos Prisma
const COLLECTION_MODEL_MAP = {
  clients: 'client',
  collaborators: 'collaborator',
  company: 'company',
  contracts: 'contract',
  facturas: 'factura',
  firebaseProjects: 'firebaseProject',
  geminiLinks: 'geminiLink',
  htmls: 'html',
  ias: 'ia',
  images: 'image',
  invoicesIn: 'invoiceIn',
  landAdResponses: 'landAdResponse',
  landAds: 'landAd',
  objectives: 'objective',
  officeSections: 'officeSection',
  portfolio: 'portfolio',
  presentations: 'presentation',
  presupuestos: 'presupuesto',
  proposals: 'proposal',
  protocols: 'protocol',
  servicePages: 'servicePage',
  services: 'service',
  tools: 'tool',
  trainingItems: 'trainingItem',
  trainingSubsections: 'trainingSubsection',
  userStatus: 'userStatus',
  videos: 'video',
  webContent: 'webContent',
  workSessions: 'workSession',
} as const;

interface FirebaseDocument {
  id: string;
  [key: string]: any;
}

async function importCollection(collectionName: string, modelName: string) {
  try {
    const filePath = path.join(__dirname, '../backup', `${collectionName}.json`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Archivo no encontrado: ${collectionName}.json`);
      return 0;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const documents: FirebaseDocument[] = JSON.parse(fileContent);

    if (!documents || documents.length === 0) {
      console.log(`⚠️  Colección vacía: ${collectionName}`);
      return 0;
    }

    console.log(`📦 Importando ${collectionName}: ${documents.length} documentos...`);

    // Obtener el modelo de Prisma dinámicamente
    const model = (prisma as any)[modelName];
    
    if (!model) {
      throw new Error(`Modelo ${modelName} no encontrado en Prisma`);
    }

    let imported = 0;
    let errors = 0;

    for (const doc of documents) {
      try {
        // Extraer el ID de Firebase
        const firebaseId = doc.id;
        
        // Crear una copia del documento sin el id para guardarlo en el campo data
        const { id, _exported_at, ...dataToStore } = doc;

        await model.create({
          data: {
            firebaseId,
            data: dataToStore,
          },
        });

        imported++;
      } catch (error: any) {
        errors++;
        if (error.code === 'P2002') {
          // Documento duplicado, intentar actualizar
          try {
            const { id, _exported_at, ...dataToStore } = doc;
            await model.update({
              where: { firebaseId: doc.id },
              data: { data: dataToStore },
            });
            imported++;
            errors--;
          } catch (updateError) {
            console.error(`  ❌ Error actualizando documento ${doc.id}:`, updateError);
          }
        } else {
          console.error(`  ❌ Error importando documento ${doc.id}:`, error.message);
        }
      }
    }

    console.log(`  ✅ Importados: ${imported} | Errores: ${errors}`);
    return imported;
  } catch (error) {
    console.error(`❌ Error en colección ${collectionName}:`, error);
    return 0;
  }
}

async function importAllData() {
  console.log('🚀 Iniciando importación de Firebase a PostgreSQL...\n');
  console.log('='.repeat(60));
  
  try {
    let totalImported = 0;
    const summary: { [key: string]: number } = {};

    // Importar cada colección
    for (const [collectionName, modelName] of Object.entries(COLLECTION_MODEL_MAP)) {
      const count = await importCollection(collectionName, modelName);
      if (count > 0) {
        summary[collectionName] = count;
        totalImported += count;
      }
      console.log(''); // Línea en blanco para separar
    }

    console.log('='.repeat(60));
    console.log('🎉 IMPORTACIÓN COMPLETADA');
    console.log('='.repeat(60));
    console.log(`📊 Total de documentos importados: ${totalImported}`);
    console.log('\nResumen por colección:');
    
    Object.entries(summary)
      .sort((a, b) => b[1] - a[1])
      .forEach(([name, count]) => {
        console.log(`   ${count.toString().padStart(4)} docs → ${name}`);
      });
    
    console.log('='.repeat(60));
    console.log('\n💡 Siguiente paso: Ejecuta "npx prisma studio" para verificar los datos\n');
    
  } catch (error) {
    console.error('❌ Error durante la importación:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar importación
importAllData();
