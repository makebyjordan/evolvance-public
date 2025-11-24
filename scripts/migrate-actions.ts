import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_DIR = path.join(__dirname, '../src/app/actions');

// Mapeo de colecciones a modelos de Prisma
const COLLECTION_TO_MODEL: Record<string, string> = {
  facturas: 'factura',
  'firebase-projects': 'firebaseProject',
  'gemini-links': 'geminiLink',
  htmls: 'html',
  ias: 'ia',
  images: 'image',
  'invoices-in': 'invoiceIn',
  'invoices-out': 'invoiceOut', // Si existe
  'land-ads': 'landAd',
  'land-ads-responses': 'landAdResponse',
  objectives: 'objective',
  'office-sections': 'officeSection',
  portfolio: 'portfolio',
  presentations: 'presentation',
  presupuestos: 'presupuesto',
  proposals: 'proposal',
  protocols: 'protocol',
  'service-pages': 'servicePage',
  tools: 'tool',
  'training-items': 'trainingItem',
  trainingSubsections: 'trainingSubsection',
  training: 'training',
  'user-status': 'userStatus',
  videos: 'video',
  'web-content': 'webContent',
  'work-sessions': 'workSession',
  'follow-ups': 'followUp',
  horario: 'horario',
};

function getModelName(filename: string): string {
  const name = filename.replace('-actions.ts', '');
  return COLLECTION_TO_MODEL[name] || name;
}

function migrateActionFile(filepath: string): string {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Ya migrados - skip
  if (content.includes('@/lib/firebase-adapter')) {
    return 'ALREADY_MIGRATED';
  }

  // Patrón 1: Reemplazar imports de Firebase
  content = content.replace(
    /import \{ db \} from '@\/lib\/firebase';\s*import \{ collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp \} from 'firebase\/firestore';\s*(import \{ revalidatePath \} from 'next\/cache';)?/g,
    `import { revalidatePath } from 'next/cache';\nimport { createDocument, updateDocument, deleteDocument, generateFirebaseId, serverTimestamp } from '@/lib/firebase-adapter';`
  );

  content = content.replace(
    /import \{ db \} from '@\/lib\/firebase';\s*import \{ collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, getDoc, getDocs, query, where, orderBy \} from 'firebase\/firestore';\s*(import \{ revalidatePath \} from 'next\/cache';)?/g,
    `import { revalidatePath } from 'next/cache';\nimport { createDocument, updateDocument, deleteDocument, getDocument, getCollection, generateFirebaseId, serverTimestamp } from '@/lib/firebase-adapter';`
  );

  content = content.replace(
    /import \{ db \} from '@\/lib\/firebase';\s*import \{ doc, getDoc, setDoc, serverTimestamp, Timestamp \} from 'firebase\/firestore';\s*(import \{ revalidatePath \} from 'next\/cache';)?/g,
    `import { revalidatePath } from 'next/cache';\nimport { getDocument, updateDocument, createDocument, serverTimestamp, firebaseTimestampToDate } from '@/lib/firebase-adapter';`
  );

  // Eliminar collection reference
  content = content.replace(/const \w+CollectionRef = collection\(db, '.+'\);\s*/g, '');
  
  // Get model name from filename
  const filename = path.basename(filepath);
  const modelName = getModelName(filename);

  // Patrón 2: Reemplazar addDoc
  content = content.replace(
    /const docRef = await addDoc\((\w+CollectionRef), \{/g,
    `docId = generateFirebaseId();\n      await createDocument('${modelName}', docId, {`
  );
  content = content.replace(/\}\);\s*docId = docRef\.id;/g, '});');

  // Patrón 3: Reemplazar updateDoc
  content = content.replace(
    /const docRef = doc\(db, '\w+', docId\);\s*await updateDoc\(docRef, \{/g,
    `await updateDocument('${modelName}', docId, {`
  );
  content = content.replace(
    /await updateDoc\(docRef, \{/g,
    `await updateDocument('${modelName}', docId, {`
  );

  // Patrón 4: Reemplazar deleteDoc
  content = content.replace(
    /await deleteDoc\(doc\(db, '\w+', id\)\);/g,
    `await deleteDocument('${modelName}', id);`
  );

  return content;
}

// Procesar todos los archivos
const files = fs.readdirSync(ACTIONS_DIR).filter(f => f.endsWith('-actions.ts'));

console.log(`🔄 Migrando ${files.length} archivos de actions...\n`);

let migrated = 0;
let skipped = 0;
let errors = 0;

for (const file of files) {
  const filepath = path.join(ACTIONS_DIR, file);
  
  try {
    const result = migrateActionFile(filepath);
    
    if (result === 'ALREADY_MIGRATED') {
      console.log(`⏭️  ${file} - Ya migrado`);
      skipped++;
    } else {
      fs.writeFileSync(filepath, result);
      console.log(`✅ ${file} - Migrado`);
      migrated++;
    }
  } catch (error: any) {
    console.log(`❌ ${file} - Error: ${error.message}`);
    errors++;
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Migrados: ${migrated}`);
console.log(`⏭️  Ya migrados: ${skipped}`);
console.log(`❌ Errores: ${errors}`);
console.log(`${'='.repeat(60)}\n`);
