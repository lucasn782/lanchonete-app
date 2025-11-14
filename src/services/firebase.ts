// Firebase initialization placeholder. Replace with your Firebase config.
// To enable cloud sync, create a Firebase project and add web app config.
// Then populate the firebaseConfig object and use exported instances across stores.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // ignore if not configured yet
}

export const db = app ? getFirestore(app) : undefined as any;
