import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
export const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    const defaultApp = admin.initializeApp({
      credential: applicationDefault(),
    });
    return { defaultApp };
  },
};
