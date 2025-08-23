
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
        const serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
    } else {
        // This will initialize the SDK with default credentials in production
        admin.initializeApp();
    }
  } catch (error: any) {
    console.error('Firebase Admin initialization error:', error.message);
  }
}

const db = admin.apps.length ? admin.firestore() : undefined;
const auth = admin.apps.length ? admin.auth() : undefined;
const storage = admin.apps.length ? admin.storage() : undefined;

const isFirebaseAdminInitialized = () => admin.apps.length > 0;

export { db, auth, storage, isFirebaseAdminInitialized };
