
import * as admin from 'firebase-admin';

// Comprueba si la aplicación de Firebase Admin ya ha sido inicializada
if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (process.env.NODE_ENV === 'production') {
      // En producción (App Hosting), inicializa sin credenciales explícitas,
      // las tomará del entorno automáticamente.
      admin.initializeApp();
    } else {
      // En desarrollo, usa la clave de servicio desde las variables de entorno.
      if (serviceAccountKey) {
        // La clave se espera en formato Base64. Se decodifica antes de parsearla.
        const serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } else {
        console.warn('FIREBASE_SERVICE_ACCOUNT_KEY no encontrada en .env. El SDK de Admin no se inicializará en desarrollo.');
      }
    }
  } catch (error: any) {
    console.error('Error de inicialización de Firebase Admin:', error.message);
  }
}

const db = admin.apps.length ? admin.firestore() : undefined;
const auth = admin.apps.length ? admin.auth() : undefined;
const storage = admin.apps.length ? admin.storage() : undefined;

const isFirebaseAdminInitialized = () => admin.apps.length > 0;

export { db, auth, storage, isFirebaseAdminInitialized };
