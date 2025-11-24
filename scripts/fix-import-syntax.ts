import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_DIR = path.join(__dirname, '../src/app/actions');

function fixImportSyntax(filepath: string): boolean {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Buscar el patrón incorrecto: } , getCollection }
  const badPattern = /\} , getCollection \}/g;
  
  if (!badPattern.test(content)) {
    return false; // No necesita corrección
  }

  // Corregir: } , getCollection } → , getCollection }
  content = content.replace(badPattern, ', getCollection }');

  fs.writeFileSync(filepath, content);
  return true;
}

console.log('🔧 Corrigiendo sintaxis de imports...\n');

const files = fs.readdirSync(ACTIONS_DIR).filter(f => f.endsWith('-actions.ts'));

let fixed = 0;
let skipped = 0;

for (const file of files) {
  const filepath = path.join(ACTIONS_DIR, file);
  
  try {
    if (fixImportSyntax(filepath)) {
      console.log(`✅ ${file} - Corregido`);
      fixed++;
    } else {
      skipped++;
    }
  } catch (error: any) {
    console.log(`❌ ${file} - Error: ${error.message}`);
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Corregidos: ${fixed}`);
console.log(`⏭️  Sin cambios: ${skipped}`);
console.log(`${'='.repeat(60)}\n`);
