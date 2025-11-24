import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_DIR = path.join(__dirname, '../src/app/actions');

const filesToFix = [
  'horario-actions.ts',
  'land-ads-actions.ts',
  'land-ads-responses-actions.ts',
  'presupuestos-actions.ts'
];

function fixActionFile(filepath: string): void {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Reemplazar imports completos de Firebase
  content = content.replace(
    /import \{ db \} from '@\/lib\/firebase';\s*import \{[^}]+\} from 'firebase\/firestore';/g,
    "import { revalidatePath } from 'next/cache';\nimport { getDocument, updateDocument, createDocument, deleteDocument, generateFirebaseId, serverTimestamp, getCollection, queryCollection, firebaseTimestampToDate } from '@/lib/firebase-adapter';"
  );

  // Reemplazar doc(db, ...) cuando se usa para obtener un documento
  content = content.replace(
    /const docRef = doc\(db, '(\w+)', ([^)]+)\);\s*const docSnap = await getDoc\(docRef\);/g,
    'const data = await getDocument(\'$1\', $2);'
  );

  // Reemplazar if (docSnap.exists())
  content = content.replace(
    /if \(docSnap\.exists\(\)\) \{\s*const data = docSnap\.data\(\);/g,
    'if (data) {'
  );

  // Reemplazar getDocs + collection
  content = content.replace(
    /const querySnapshot = await getDocs\(collection\(db, '(\w+)'\)\);/g,
    'const items = await getCollection(\'$1\');'
  );

  // Reemplazar query complejos
  content = content.replace(
    /const q = query\(collection\(db, '(\w+)'\)[^;]*\);[\s\S]*?const querySnapshot = await getDocs\(q\);/g,
    'const items = await getCollection(\'$1\');'
  );

  // Reemplazar conversión de Timestamp
  content = content.replace(
    /if \(data\.updatedAt && data\.updatedAt instanceof Timestamp\) \{\s*data\.updatedAt = data\.updatedAt\.toDate\(\)\.toISOString\(\);\s*\}/g,
    'if (data.updatedAt) {\n        data.updatedAt = firebaseTimestampToDate(data.updatedAt).toISOString();\n      }'
  );

  // Reemplazar setDoc
  content = content.replace(
    /await setDoc\(doc\(db, '(\w+)', ([^)]+)\), \{([^}]+)\}, \{ merge: true \}\);/g,
    'await updateDocument(\'$1\', $2, {$3});'
  );

  fs.writeFileSync(filepath, content);
}

console.log('🔧 Arreglando archivos restantes...\n');

for (const file of filesToFix) {
  const filepath = path.join(ACTIONS_DIR, file);
  
  if (fs.existsSync(filepath)) {
    try {
      fixActionFile(filepath);
      console.log(`✅ ${file} - Corregido`);
    } catch (error: any) {
      console.log(`❌ ${file} - Error: ${error.message}`);
    }
  } else {
    console.log(`⏭️  ${file} - No encontrado`);
  }
}

console.log('\n✅ Corrección completada\n');
