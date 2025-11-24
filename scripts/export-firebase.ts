import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Inicializa Firebase Admin con el archivo de credenciales
const serviceAccount = require('../config/firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Función para exportar una colección
async function exportCollection(collectionName: string) {
  try {
    console.log(`📦 Exportando colección: ${collectionName}...`);
    
    const snapshot = await db.collection(collectionName).get();
    
    if (snapshot.empty) {
      console.log(`⚠️  La colección ${collectionName} está vacía`);
      return 0;
    }
    
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      _exported_at: new Date().toISOString()
    }));
    
    // Crear carpeta backup si no existe
    const backupDir = path.join(__dirname, '../backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Guardar en archivo JSON
    const filePath = path.join(backupDir, `${collectionName}.json`);
    fs.writeFileSync(
      filePath,
      JSON.stringify(data, null, 2)
    );
    
    console.log(`✅ Exportados ${data.length} documentos de ${collectionName}`);
    console.log(`   Guardado en: backup/${collectionName}.json`);
    
    return data.length;
  } catch (error) {
    console.error(`❌ Error exportando ${collectionName}:`, error);
    return 0;
  }
}

// Función principal de exportación
async function exportAllData() {
  console.log('🚀 Iniciando exportación de Firebase...\n');
  
  try {
    // ==================================================
    // 🔧 TUS 29 COLECCIONES DE FIRESTORE
    // ==================================================
    const collections = [
      'clients',
      'collaborators',
      'company',
      'contracts',
      'facturas',
      'firebaseProjects',
      'geminiLinks',
      'htmls',
      'ias',
      'images',
      'invoicesIn',
      'landAdResponses',
      'landAds',
      'objectives',
      'officeSections',
      'portfolio',
      'presentations',
      'presupuestos',
      'proposals',
      'protocols',
      'servicePages',
      'services',
      'tools',
      'trainingItems',
      'trainingSubsections',
      'userStatus',
      'videos',
      'webContent',
      'workSessions',
    ];
    
    let totalDocs = 0;
    const summary: { [key: string]: number } = {};
    
    // Exportar cada colección
    for (const collectionName of collections) {
      try {
        const count = await exportCollection(collectionName);
        if (count > 0) {
          summary[collectionName] = count;
          totalDocs += count;
        }
      } catch (error) {
        console.error(`Error en colección ${collectionName}, continuando...`);
      }
    }
    
    // Guardar resumen
    const summaryPath = path.join(__dirname, '../backup/export-summary.json');
    fs.writeFileSync(
      summaryPath,
      JSON.stringify({
        exported_at: new Date().toISOString(),
        total_documents: totalDocs,
        collections: summary,
      }, null, 2)
    );
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 EXPORTACIÓN COMPLETADA');
    console.log('='.repeat(50));
    console.log(`📊 Total de documentos exportados: ${totalDocs}`);
    console.log(`📁 Archivos guardados en: ./backup/`);
    console.log('\nResumen por colección:');
    Object.entries(summary).forEach(([name, count]) => {
      console.log(`   - ${name}: ${count} documentos`);
    });
    console.log('='.repeat(50) + '\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la exportación:', error);
    process.exit(1);
  }
}

// Ejecutar exportación
exportAllData(); 