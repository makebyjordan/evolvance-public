import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_DIR = path.join(__dirname, '../src/app/actions');

const modelMapping: Record<string, { singular: string; plural: string }> = {
  'clients-actions.ts': { singular: 'Client', plural: 'Clients' },
  'collaborators-actions.ts': { singular: 'Collaborator', plural: 'Collaborators' },
  'services-actions.ts': { singular: 'Service', plural: 'Services' },
  'contracts-actions.ts': { singular: 'Contract', plural: 'Contracts' },
  'htmls-actions.ts': { singular: 'Html', plural: 'Htmls' },
  'proposals-actions.ts': { singular: 'Proposal', plural: 'Proposals' },
  'presentations-actions.ts': { singular: 'Presentation', plural: 'Presentations' },
  'portfolio-actions.ts': { singular: 'Portfolio', plural: 'Portfolio' },
  'videos-actions.ts': { singular: 'Video', plural: 'Videos' },
  'images-actions.ts': { singular: 'Image', plural: 'Images' },
  'objectives-actions.ts': { singular: 'Objective', plural: 'Objectives' },
  'protocols-actions.ts': { singular: 'Protocol', plural: 'Protocols' },
  'land-ads-actions.ts': { singular: 'LandAd', plural: 'LandAds' },
  'land-ads-responses-actions.ts': { singular: 'LandAdResponse', plural: 'LandAdResponses' },
  'office-sections-actions.ts': { singular: 'OfficeSection', plural: 'OfficeSections' },
  'tools-actions.ts': { singular: 'Tool', plural: 'Tools' },
  'ias-actions.ts': { singular: 'Ia', plural: 'Ias' },
  'gemini-links-actions.ts': { singular: 'GeminiLink', plural: 'GeminiLinks' },
  'firebase-projects-actions.ts': { singular: 'FirebaseProject', plural: 'FirebaseProjects' },
  'facturas-actions.ts': { singular: 'Factura', plural: 'Facturas' },
  'presupuestos-actions.ts': { singular: 'Presupuesto', plural: 'Presupuestos' },
  'invoices-in-actions.ts': { singular: 'InvoiceIn', plural: 'InvoicesIn' },
  'invoices-out-actions.ts': { singular: 'InvoiceOut', plural: 'InvoicesOut' },
  'training-items-actions.ts': { singular: 'TrainingItem', plural: 'TrainingItems' },
  'follow-ups-actions.ts': { singular: 'FollowUp', plural: 'FollowUps' },
};

function getModelName(filename: string): string {
  const name = filename.replace('-actions.ts', '');
  const mapping: Record<string, string> = {
    'clients': 'client',
    'collaborators': 'collaborator',
    'services': 'service',
    'contracts': 'contract',
    'htmls': 'html',
    'proposals': 'proposal',
    'presentations': 'presentation',
    'portfolio': 'portfolio',
    'videos': 'video',
    'images': 'image',
    'objectives': 'objective',
    'protocols': 'protocol',
    'land-ads': 'landAd',
    'land-ads-responses': 'landAdResponse',
    'office-sections': 'officeSection',
    'tools': 'tool',
    'ias': 'ia',
    'gemini-links': 'geminiLink',
    'firebase-projects': 'firebaseProject',
    'facturas': 'factura',
    'presupuestos': 'presupuesto',
    'invoices-in': 'invoiceIn',
    'invoices-out': 'invoiceOut',
    'training-items': 'trainingItem',
    'follow-ups': 'followUp',
  };
  return mapping[name] || name;
}

function addGetFunction(filepath: string, filename: string): boolean {
  let content = fs.readFileSync(filepath, 'utf-8');

  // Skip if already has get function
  if (content.includes('Gets all ') || content.includes('export async function get')) {
    return false;
  }

  const names = modelMapping[filename];
  if (!names) return false;

  const modelName = getModelName(filename);

  // Ensure getCollection is imported
  if (!content.includes('getCollection')) {
    content = content.replace(
      /from '@\/lib\/firebase-adapter';/,
      ", getCollection } from '@/lib/firebase-adapter';"
    );
  }

  // Add get function at the end
  const getFunction = `
/**
 * Gets all ${names.plural.toLowerCase()}.
 */
export async function get${names.plural}(): Promise<${names.singular}[]> {
  try {
    return await getCollection<${names.singular}>('${modelName}');
  } catch (error: any) {
    console.error('Error getting ${names.plural.toLowerCase()}:', error);
    return [];
  }
}
`;

  content = content.trimEnd() + '\n' + getFunction;

  fs.writeFileSync(filepath, content);
  return true;
}

console.log('📝 Agregando funciones de lectura...\n');

let added = 0;
let skipped = 0;

for (const [filename, names] of Object.entries(modelMapping)) {
  const filepath = path.join(ACTIONS_DIR, filename);
  
  if (fs.existsSync(filepath)) {
    if (addGetFunction(filepath, filename)) {
      console.log(`✅ ${filename} - Función get${names.plural} agregada`);
      added++;
    } else {
      console.log(`⏭️  ${filename} - Ya tiene función de lectura`);
      skipped++;
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ Agregadas: ${added}`);
console.log(`⏭️  Saltadas: ${skipped}`);
console.log(`${'='.repeat(60)}\n`);
