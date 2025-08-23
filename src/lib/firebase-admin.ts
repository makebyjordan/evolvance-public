
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
    }

    let serviceAccount;
    try {
        // First, try to parse it as a JSON object directly
        serviceAccount = JSON.parse(serviceAccountKey);
    } catch (e) {
        // If that fails, assume it's a base64 encoded string
        serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf8'));
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error('Firebase Admin initialization error:', error.message);
    // We don't want to throw the error here, because it will crash the server.
    // Instead, we will check if the app is initialized in the functions that need it.
  }
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

const isFirebaseAdminInitialized = () => admin.apps.length > 0;

export { db, auth, storage, isFirebaseAdminInitialized };
