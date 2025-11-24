import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_DIR = path.join(__dirname, '../src/app/actions');

function removeDuplicateImports(filepath: string): boolean {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;

  // Buscar y eliminar imports duplicados de revalidatePath
  // Patrón: dos imports de revalidatePath en líneas consecutivas o cercanas
  const lines = content.split('\n');
  const newLines: string[] = [];
  const seenImports = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Si es un import de revalidatePath
    if (line.includes("import { revalidatePath } from 'next/cache'")) {
      const importKey = line.trim();
      
      // Solo agregar si no lo hemos visto antes
      if (!seenImports.has(importKey)) {
        seenImports.add(importKey);
        newLines.push(line);
      }
      // Si es duplicado, lo saltamos (no lo agregamos)
    } else {
      newLines.push(line);
    }
  }

  content = newLines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    return true;
  }

  return false;
}

console.log('🔧 Eliminando imports duplicados...\n');

const files = fs.readdirSync(ACTIONS_DIR).filter(f => f.endsWith('-actions.ts'));

let fixed = 0;
let skipped = 0;

for (const file of files) {
  const filepath = path.join(ACTIONS_DIR, file);
  
  try {
    if (removeDuplicateImports(filepath)) {
      console.log(`✅ ${file} - Duplicados eliminados`);
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
