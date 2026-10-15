import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAM48Q-I2lb1FFBTXb04r-Coy4pmm8405A",
  authDomain: "nomadic-nirvana-9xvx5.firebaseapp.com",
  projectId: "nomadic-nirvana-9xvx5",
  storageBucket: "nomadic-nirvana-9xvx5.firebasestorage.app",
  messagingSenderId: "1066655643904",
  appId: "1:1066655643904:web:0fd2a40697b2712c1a1be5"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  prompt: 'select_account',
});

export { auth, db, googleProvider, microsoftProvider };
