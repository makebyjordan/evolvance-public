import admin from 'firebase-admin';

// Inicializa Firebase Admin
const serviceAccount = require('../config/firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function listCollections() {
  console.log('🔍 Listando todas las colecciones de Firestore...\n');
  
  try {
    const collections = await db.listCollections();
    
    console.log('📚 Colecciones encontradas:');
    console.log('='.repeat(50));
    
    for (const collection of collections) {
      const snapshot = await collection.limit(1).get();
      const count = snapshot.size > 0 ? '✅ Tiene datos' : '⚠️  Vacía';
      console.log(`  - ${collection.id} ${count}`);
    }
    
    console.log('='.repeat(50));
    console.log(`\n📊 Total: ${collections.length} colecciones`);
    console.log('\n💡 Copia estos nombres y añádelos en el script export-firebase.ts\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error listando colecciones:', error);
    process.exit(1);
  }
}

listCollections();
